import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';
import { unlink } from 'fs';

const unlinkAsync = promisify(unlink);

export class Helper {
  static storageFile(pathFile: string) {
    return {
      fileFilter: (req, file, cb) => {
        if (!file || !file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          return cb(null, false);
        }
        return cb(null, true);
      },
      storage: diskStorage({
        destination: pathFile,
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now();
          const fileName = 'image_' + uuidv4();
          const extension = path.parse(file.originalname).ext;
          cb(null, `${fileName}_${uniqueSuffix}${extension}`);
        },
      }),
    };
  }

  static updateFile(pathFile: string) {
    return {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          return cb(null, false);
        }
        return cb(null, true);
      },
      storage: diskStorage({
        destination: pathFile,
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now();
          const fileName = 'image_' + uuidv4();
          const extension = path.parse(file.originalname).ext;
          cb(null, `${fileName}_${uniqueSuffix}${extension}`);
        },
      }),
    };
  }

  static async removeFile(file: string) {
    try {
      await unlinkAsync(file);
    } catch (err) {
      throw new Error('Arquivo não encontrado');
    }
    return true;
  }
}
