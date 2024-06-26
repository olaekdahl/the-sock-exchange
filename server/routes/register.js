import express from 'express';
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (name && email && name.trim() !== '' && email.trim() !== '') {
      res.status(201).json({ message: 'success' });
    } else {
      res.status(400).json({ message: 'Invalid user or email' });
    }
  } catch (err) {
    next(err);
  }
});

export const registerRoutes = router;