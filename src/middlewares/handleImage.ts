import multer from 'multer';

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000 }
});

export default uploadMiddleware;
