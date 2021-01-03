import React,{Component} from 'react';

/**
 * Checks whether the argument is an object
 * @param {any} o
 */
class VideoCapture extends Component () {
  constructor(){
   super();
   this.state = {
     recordScreen:false,
     setRecordScreen:false,
     audio:false,
     error:null, setError:null,
     status:'idle', setStatus:'idle',
     mediaBlob:null, setMediaBlob:null,
     isAudioMuted:false, setIsAudioMuted:false
   } 
  }
  
  isObject(o){
    return o && !Array.isArray(o) && Object(o) === o;
  }
  
  /**
   * Checks whether constraints are valid
   * @param {MediaStreamConstraints} mediaType
   */
  validateMediaTrackConstraints(mediaType) {
    let supportedMediaConstraints = navigator.mediaDevices.getSupportedConstraints();
    let unSupportedMediaConstraints = Object.keys(mediaType).filter(
      (constraint) => !supportedMediaConstraints[constraint]
    );
  
    if (unSupportedMediaConstraints.length !== 0) {
      let toText = unSupportedMediaConstraints.join(',');
      console.error(
        `The following constraints ${toText} are not supported on this browser.`
      );
    }
  }
  /**
   *
   * @callback Callback
   * @param {Blob} blob
   *
   * @callback ErrorCallback
   * @param {Error} error
   *
   * @typedef MediaRecorderProps
   * @type {object}
   * @property {BlobPropertyBag} blobOptions
   * @property {boolean} recordScreen
   * @property {function} onStart
   * @property {Callback} onStop
   * @property {Callback} onDataAvailable
   * @property {ErrorCallback} onError
   * @property {object} mediaRecorderOptions
   * @property {MediaStreamConstraints} mediaStreamConstraints
   *
   * @typedef MediaRecorderHookOptions
   * @type {object}
   * @property {Error} error
   * @property {string} status
   * @property {Blob} mediaBlob
   * @property {boolean} isAudioMuted
   * @property {function} stopRecording,
   * @property {function} getMediaStream,
   * @property {function} clearMediaStream,
   * @property {function} startRecording,
   * @property {function} pauseRecording,
   * @property {function} resumeRecording,
   * @property {function} muteAudio
   * @property {function} unMuteAudio
   * @property {MediaStream} liveStream
   *
   * @param {MediaRecorderProps}
   * @returns {MediaRecorderHookOptions}
   */
  useMediaRecorder({
    blobOptions,
    recordScreen,
    onStop = noop,
    onStart = noop,
    onError = noop,
    onDataAvailable = noop,
    mediaRecorderOptions,
    mediaStreamConstraints = {}
  }) {
    let mediaChunks = React.useRef([]);
    let mediaStream = React.useRef(null);
    let mediaRecorder = React.useRef(null);
    
  
    async function getMediaStream() {
      if (error) {
        setError(null);
      }
  
      setStatus('acquiring_media');
  
      try {
        let stream;
  
        if (recordScreen) {
          stream = await window.navigator.mediaDevices.getDisplayMedia(
            mediaStreamConstraints
          );
        } else {
          stream = await window.navigator.mediaDevices.getUserMedia(
            mediaStreamConstraints
          );
        }
  
        if (recordScreen && mediaStreamConstraints.audio) {
          let audioStream = await window.navigator.mediaDevices.getUserMedia({
            audio: mediaStreamConstraints.audio
          });
  
          audioStream
            .getAudioTracks()
            .forEach((audioTrack) => stream.addTrack(audioTrack));
        }
  
        mediaStream.current = stream;
        setStatus('ready');
      } catch (err) {
        setError(err);
        setStatus('failed');
      }
    }
  
    function clearMediaStream() {
      if (mediaRecorder.current) {
        mediaRecorder.current.removeEventListener(
          'dataavailable',
          handleDataAvailable
        );
        mediaRecorder.current.removeEventListener('stop', handleStop);
        mediaRecorder.current.removeEventListener('error', handleError);
        mediaRecorder.current = null;
      }
  
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach((track) => track.stop());
        mediaStream.current = null;
        mediaChunks.current = [];
      }
    }
  
    async function startRecording() {
      if (error) {
        setError(null);
      }
  
      if (!mediaStream.current) {
        await getMediaStream();
      }
  
      mediaChunks.current = [];
  
      if (mediaStream.current) {
        mediaRecorder.current = new MediaRecorder(
          mediaStream.current,
          mediaRecorderOptions
        );
        mediaRecorder.current.addEventListener(
          'dataavailable',
          handleDataAvailable
        );
        mediaRecorder.current.addEventListener('stop', handleStop);
        mediaRecorder.current.addEventListener('error', handleError);
        mediaRecorder.current.start();
        setStatus('recording');
        onStart();
      }
    }
  
    function handleDataAvailable(e) {
      if (e.data.size) {
        mediaChunks.current.push(e.data);
      }
      onDataAvailable(e.data);
    }
  
    function handleStop() {
      let [sampleChunk] = mediaChunks.current;
      let blobPropertyBag = Object.assign(
        { type: sampleChunk.type },
        blobOptions
      );
      let blob = new Blob(mediaChunks.current, blobPropertyBag);
  
      setStatus('stopped');
      setMediaBlob(blob);
      onStop(blob);
    }
  
    function handleError(e) {
      setError(e.error);
      setStatus('idle');
      onError(e.error);
    }
  
    function muteAudio(mute) {
      setIsAudioMuted(mute);
  
      if (mediaStream.current) {
        mediaStream.current.getAudioTracks().forEach((audioTrack) => {
          audioTrack.enabled = !mute;
        });
      }
    }
  
    function pauseRecording() {
      if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
        mediaRecorder.current.pause();
      }
    }
  
    function resumeRecording() {
      if (mediaRecorder.current && mediaRecorder.current.state === 'paused') {
        mediaRecorder.current.resume();
      }
    }
  
    function stopRecording() {
      if (mediaRecorder.current) {
        setStatus('stopping');
        mediaRecorder.current.stop();
        // not sure whether to place clean up in useEffect?
        // If placed in useEffect the handler functions become dependencies of useEffect
        mediaRecorder.current.removeEventListener(
          'dataavailable',
          handleDataAvailable
        );
        mediaRecorder.current.removeEventListener('stop', handleStop);
        mediaRecorder.current.removeEventListener('error', handleError);
        mediaRecorder.current = null;
        clearMediaStream();
      }
    }
  
    React.useEffect(() => {
      if (!window.MediaRecorder) {
        throw new ReferenceError(
          'MediaRecorder is not supported in this browser. Please ensure that you are running the latest version of chrome/firefox/edge.'
        );
      }
  
      if (recordScreen && !window.navigator.mediaDevices.getDisplayMedia) {
        throw new ReferenceError(
          'This browser does not support screen capturing'
        );
      }
  
      if (isObject(mediaStreamConstraints.video)) {
        validateMediaTrackConstraints(mediaStreamConstraints.video);
      }
  
      if (isObject(mediaStreamConstraints.audio)) {
        validateMediaTrackConstraints(mediaStreamConstraints.audio);
      }
  
      if (mediaRecorderOptions && mediaRecorderOptions.mimeType) {
        if (!MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)) {
          console.error(
            `The specified MIME type supplied to MediaRecorder is not supported by this browser.`
          );
        }
      }
    }, [mediaStreamConstraints, mediaRecorderOptions, recordScreen]);
  
    return {
      error,
      status,
      mediaBlob,
      isAudioMuted,
      stopRecording,
      getMediaStream,
      startRecording,
      pauseRecording,
      resumeRecording,
      clearMediaStream,
      muteAudio: () => muteAudio(true),
      unMuteAudio: () => muteAudio(false),
      get liveStream() {
        if (mediaStream.current) {
          return new MediaStream(mediaStream.current.getVideoTracks());
        }
        return null;
      }
    };
  }
  
   Player({ srcBlob }) {
    if (!srcBlob) {
      return null;
    }
  
    return (
      <video
        src={URL.createObjectURL(srcBlob)}
        width={520}
        height={480}
        controls
      />
    );
  }
  
  render(){
    const noop = () => {};
    let {
      status,
      mediaBlob,
      stopRecording,
      getMediaStream,
      startRecording,
      clearMediaStream
    } = useMediaRecorder({
      recordScreen,
      mediaStreamConstraints: { audio, video: true }
    });
    React.useEffect(() => clearMediaStream, []);
    
  
  //eslint-disable-next-line
 

  return (
    <article>
      <h1>Video recorder</h1>
      <dialog open={status === 'acquiring_media'}>
        Waiting for permissions
      </dialog>
      <p>
        Select video source
        <label>
          <input
            type="radio"
            checked={recordScreen}
            onChange={() => setRecordScreen((prevState) => !prevState)}
          />{' '}
          Screen
        </label>
      </p>
      <section>
        {status !== 'recording' && (
          <button
            type="button"
            onClick={async () => {
              await getMediaStream();
              startRecording();
            }}
          >
            Start recording
          </button>
        )}
        {status === 'recording' && (
          <button type="button" onClick={stopRecording}>
            Stop recording
          </button>
        )}
      </section>
      <Player srcBlob={mediaBlob} />
    </article>
  );  
  }
}

export default VideoCapture;



// import React from 'react';
// import MediaCapturer from 'react-multimedia-capture';

// class VideoExample extends React.Component {
// 	constructor() {
// 		super();
// 		this.state = {
// 			granted: false,
// 			rejectedReason: '',
// 			recording: false,
// 			paused: false
// 		};

// 		this.handleRequest = this.handleRequest.bind(this);
// 		this.handleGranted = this.handleGranted.bind(this);
// 		this.handleDenied = this.handleDenied.bind(this);
// 		this.handleStart = this.handleStart.bind(this);
// 		this.handleStop = this.handleStop.bind(this);
// 		this.handlePause = this.handlePause.bind(this);
// 		this.handleResume = this.handleResume.bind(this);
// 		this.handleStreamClose = this.handleStreamClose.bind(this);
// 		this.setStreamToVideo = this.setStreamToVideo.bind(this);
// 		this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
// 		this.downloadVideo = this.downloadVideo.bind(this);
// 	}
// 	handleRequest() {
// 		console.log('Request Recording...');
// 	}
// 	handleGranted() {
// 		this.setState({ granted: true });
// 		console.log('Permission Granted!');
// 	}
// 	handleDenied(err) {
// 		this.setState({ rejectedReason: err.name });
// 		console.log('Permission Denied!', err);
// 	}
// 	handleStart(stream) {
// 		this.setState({
// 			recording: true
// 		});

// 		this.setStreamToVideo(stream);
// 		console.log('Recording Started.');
// 	}
// 	handleStop(blob) {
// 		this.setState({
// 			recording: false
// 		});

// 		this.releaseStreamFromVideo();

// 		console.log('Recording Stopped.');
// 		this.downloadVideo(blob);
// 	}
// 	handlePause() {
// 		this.releaseStreamFromVideo();

// 		this.setState({
// 			paused: true
// 		});
// 	}
// 	handleResume(stream) {
// 		this.setStreamToVideo(stream);

// 		this.setState({
// 			paused: false
// 		});
// 	}
// 	handleError(err) {
// 		console.log(err);
// 	}
// 	handleStreamClose() {
// 		this.setState({
// 			granted: false
// 		});
// 	}
// 	setStreamToVideo(stream) {
// 		let video = this.refs.app.querySelector('video');
		
// 		if(window.URL) {
// 			video.src = window.URL.createObjectURL(stream);
// 		}
// 		else {
// 			video.src = stream;
// 		}
// 	}
// 	releaseStreamFromVideo() {
// 		this.refs.app.querySelector('video').src = '';
// 	}
// 	downloadVideo(blob) {
// 		let url = URL.createObjectURL(blob);
// 		let a = document.createElement('a');
// 		a.style.display = 'none';
// 		a.href = url;
// 		a.target = '_blank';
// 		document.body.appendChild(a);

// 		a.click();
// 	}
// 	render() {
// 		const granted = this.state.granted;
// 		const rejectedReason = this.state.rejectedReason;
// 		const recording = this.state.recording;
// 		const paused = this.state.paused;

// 		return (
// 			<div ref="app">
// 				<MediaCapturer
// 					constraints={{ audio: true, video: true }}
// 					timeSlice={10}
// 					onRequestPermission={this.handleRequest}
// 					onGranted={this.handleGranted}
// 					onDenied={this.handleDenied}
// 					onStart={this.handleStart}
// 					onStop={this.handleStop}
// 					onPause={this.handlePause}
// 					onResume={this.handleResume}
// 					onError={this.handleError} 
// 					onStreamClosed={this.handleStreamClose}
// 					render={({ request, start, stop, pause, resume }) => 
// 					<div>
// 						<p><b>Granted: </b>{granted.toString()} {'   '}
// 						<b>Rejected Reason: </b>{rejectedReason}{'   '}<b>Recording: </b>{recording.toString()}{ '   '}<b>Paused: </b>{paused.toString()}</p>

// 						{!granted && <button type="button" onClick={request}>Get Permission</button>}
// 						<button type="button" onClick={start}>Start</button>
						
// 						<p>Streaming test</p>
// 						<video autoPlay></video>
// 					</div>
// 				} />
// 			</div>
// 		);
// 	}
// }

// export default VideoExample;