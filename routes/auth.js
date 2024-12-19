import Router from 'express';
import { signup, signin } from '../controller/user.controller.js';

const router = Router();

// GET Signup Page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// GET Sign-in Page
router.get('/signin', (req, res) => {
  res.render('signin');
});

// POST Signup
router.post('/signup', signup);

// POST Sign-in
router.post('/signin', signin);

export default router;
