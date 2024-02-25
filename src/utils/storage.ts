import multer from 'multer';
import { reqType } from '../config/types';

const storage = multer.diskStorage({
  destination: (_req: reqType, _file: Express.Multer.File, cb: (
    error: Error | null,
    destination: string,
  ) => void) => {
    cb(null, 'uploads/');
  },
  filename: (_req: reqType, file: Express.Multer.File, cb: (
    error: Error | null,
    destination: string,
  ) => void) => {
    cb(null, file.originalname);
  }
});

const uploadMedia = multer({ storage });

export default uploadMedia;
