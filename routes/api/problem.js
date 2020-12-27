const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Problem = require('../../models/Problem');
// Profile model
// const Profile = require('../../models/Profile');

// Validation
const validateProblemInput = require('../../validation/problem');

//add problem
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProblemInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    
    const newProblem = {
      name: req.body.name,
      question: req.body.question,
    };
    newProblem.answer = req.body.answer.split(',');
    // console.log(newProblem);   
    new Problem(newProblem).save().then(problem => res.json(problem)).catch(err => console.log(err));;
  }
);
//get problem
router.post(
  '/getProblem',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Problem.find(req.body)
      .then(problem=>res.json(problem))
      .catch(err=>console.log(err));
  }
);
//delete problem
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      // console.log(req.params.id);
      Problem.findOneAndRemove({ _id: req.params.id }).then(() => {
          res.json({ success: true })
      });
    }
    
  );
//get exmination
router.get(
  '/getExamination',
  passport.authenticate('jwt', { session: false }),
  (req, res) =>{
    Problem.find().then((data)=>{
      res.json(data)
    });
  }
)
// // @route   POST api/posts/like/:id
// // @desc    Like post
// // @access  Private
// router.post(
//   '/like/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Post.findById(req.params.id)
//         .then(post => {
//           if (
//             post.likes.filter(like => like.user.toString() === req.user.id)
//               .length > 0
//           ) {
//             return res
//               .status(400)
//               .json({ alreadyliked: 'User already liked this post' });
//           }

//           // Add user id to likes array
//           post.likes.unshift({ user: req.user.id });

//           post.save().then(post => res.json(post));
//         })
//         .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
//     });
//   }
// );

// // @route   POST api/posts/unlike/:id
// // @desc    Unlike post
// // @access  Private
// router.post(
//   '/unlike/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Post.findById(req.params.id)
//         .then(post => {
//           if (
//             post.likes.filter(like => like.user.toString() === req.user.id)
//               .length === 0
//           ) {
//             return res
//               .status(400)
//               .json({ notliked: 'You have not yet liked this post' });
//           }

//           // Get remove index
//           const removeIndex = post.likes
//             .map(item => item.user.toString())
//             .indexOf(req.user.id);

//           // Splice out of array
//           post.likes.splice(removeIndex, 1);

//           // Save
//           post.save().then(post => res.json(post));
//         })
//         .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
//     });
//   }
// );

// // @route   POST api/posts/comment/:id
// // @desc    Add comment to post
// // @access  Private
// router.post(
//   '/comment/:id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validatePostInput(req.body);

//     // Check Validation
//     if (!isValid) {
//       // If any errors, send 400 with errors object
//       return res.status(400).json(errors);
//     }

//     Post.findById(req.params.id)
//       .then(post => {
//         const newComment = {
//           text: req.body.text,
//           name: req.body.name,
//           avatar: req.body.avatar,
//           user: req.user.id
//         };

//         // Add to comments array
//         post.comments.unshift(newComment);

//         // Save
//         post.save().then(post => res.json(post));
//       })
//       .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
//   }
// );

// // @route   DELETE api/posts/comment/:id/:comment_id
// // @desc    Remove comment from post
// // @access  Private
// 

module.exports = router;
