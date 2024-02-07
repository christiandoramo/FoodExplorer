const multer = require('multer')
import * as path from 'path';
import * as crypto from 'crypto';

const TEMP_FOLDER = path.resolve(__dirname, '..', '..', 'temp')
// const UPLOADS_FOLDER = path.resolve(TEMP_FOLDER, 'uploads')
const UPLOADS_FOLDER = path.resolve(TEMP_FOLDER, '..', 'public', 'uploads')

const MULTER = {
    storage: multer.diskStorage({
        destination: TEMP_FOLDER,
        filename(request: any, file: any, callback: any) {
            const fileHash = crypto.randomBytes(8).toString('hex')
            const extName = path.extname(file.originalname)
            const baseName = path.basename(file.originalname, extName)
            const fileName = `${baseName.replace(/ /g, "-")}-${fileHash}${extName}`
            return callback(null, fileName)
        }
    })

}

export { TEMP_FOLDER, UPLOADS_FOLDER, MULTER }