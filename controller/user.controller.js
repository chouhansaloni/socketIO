import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';

// Controller for Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.redirect('/user/signin');
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
};

// Controller for Sign-in
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    
    // Send success response
    res.send('Sign-in successful!');
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
};