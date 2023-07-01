import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const productMulterConfig = {
  storage: diskStorage({
    destination: './public/images/products',
    filename: (request, file, callback) => {
      const fileName = 'image_' + uuidv4();
      const extension = path.parse(file.originalname).ext;
      callback(null, `${fileName}${extension}`);
    },
  }),
};

export default productMulterConfig;
