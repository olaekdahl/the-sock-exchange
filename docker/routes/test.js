import express from 'express';

const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    res.json({"msg":"hello"});
  } catch (err) {
    next(err);
  }
});



export const testRoutes = router;