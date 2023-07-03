import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export class Helper {
  static storageFile() {
    return {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {
          console.log('aqui');
          req.fileValidationError = true;
          cb(null, false);
        }
      },
      storage: diskStorage({
        destination: './uploads/images/products',
        filename: (request, file, callback) => {
          const fileName = 'image_' + uuidv4();
          const extension = path.parse(file.originalname).ext;
          callback(null, `${fileName}${extension}`);
        },
      }),
    };
  }
}
