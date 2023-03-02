const multer = require('multer');
const constents = require('./constents');

const upload = (file) => {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // cb(null, './assets/')            
            /*
            fieldname: 'mediaFile',
            originalname: 'pexels-lisa-fotios-1540258.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg'
            */
            // file.mimetype.match('text.*|image.*');
            if (file.mimetype.match('image.*')) {
                cb(null, `${constents.UPLOAD_DIR}/images`)
            } else if (file.mimetype.match('application/json')) {
                cb(null, `${constents.UPLOAD_DIR}/others`)
            }
        },
        filename: function (req, file, cb) {
            // console.log("File Object",file);
            let ext = '';
            if (file.originalname.split('.').length > 1) {
                ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
            }
            // console.log('ext', ext);
            let filename = file.originalname.replace(/\s/g, '');
            cb(null, Date.now() + "_" + filename);
        }
    });

    // list of accepted file formats
    const whitelist = constents.ACCEPTED_FORMATS;

    return multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (!whitelist.includes(file.mimetype)) {
                req.fileValidationError = "Forbidden extension";
                return cb(null, false, req.fileValidationError);
            }
            cb(null, true);
        }
    }).single(file, (req, res, next) => {

    });
}


// calculating size of file 
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '' + sizes[i];
}


module.exports = {
    upload,
    formatBytes
}



