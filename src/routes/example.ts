import express from 'express';

const router = express.Router();

router.get('/example', (_req, res) => {
  res.send('Predix is online, this is an example');
});

export default router;
