const express = require('express');
const router = express.Router();
const { Photo } = require("../../models/Photo");
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');

const { auth } = require("../../middleware/auth");



const s3 = new aws.S3({
    accessKeyId: 'AKIAZEC6KG6JILZPYGUQ',
    secretAccessKey: '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',
    Bucket: 'famcloud'
});



const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'famcloud',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profileImage');
/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
/**
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post('/uploadSingle', (req, res) => {
    profileImgUpload(req, res, (error) => {
        // console.log( 'requestOkokok', req.file );
        // console.log( 'error', error );
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                console.log('Error: No File Selected!');
                res.json('Error: No File Selected');
            } else {
                // If Success
                const imageName = req.file.key;
                const imageLocation = req.file.location;
                // Save the file name into database into profile model
                res.json({
                    image: imageName,
                    location: imageLocation
                });
            }
        }
    });
});
// End of single profile upload


// Multiple File Uploads ( max 4 )
const uploadsBusinessGallery = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'famcloud',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array('galleryImage', 4);

//  * @route POST /api/profile/business-gallery-upload
//  * @desc Upload business Gallery images
//  * @access public

router.post('/uploadMultiple', (req, res) => {
    uploadsBusinessGallery(req, res, (error) => {
        console.log('files', req.files);
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.files === undefined) {
                console.log('Error: No File Selected!');
                res.json('Error: No File Selected');
            } else {
                // If Success
                let fileArray = req.files,
                    fileLocation;
                const galleryImgLocationArray = [];
                for (let i = 0; i < fileArray.length; i++) {
                    fileLocation = fileArray[i].location;
                    console.log('filenm', fileLocation);
                    galleryImgLocationArray.push(fileLocation)
                }
                // Save the file name into database
                res.json({
                    filesArray: fileArray,
                    locationArray: galleryImgLocationArray
                });
            }
        }
    });
});


// router.post("/uploadPhoto", auth, (req, res) => {

//     //save client datat into DB 
//     const photo = new Photo(req.body)
//     console.log(req.body)

//     photo.save((err) => {
//         if (err) returnres.status(400).json({ success: false, err })
//         return res.status(200).json({ success: true })
//     })

// });


// router.post("/getPhoto", (req, res) => {

//     let order = req.body.order ? req.body.order : "desc";
//     let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
//     let limit = req.body.limit ? parseInt(req.body.limit) : 100;
//     let skip = parseInt(req.body.skip);

//     let findArgs = {};
//     let term = req.body.searchTerm;

//     for (let key in req.body.filters) {

//         if (req.body.filters[key].length > 0) {
//             if (key === "year" || "continents") {
//                 findArgs[key] = {
//                     $eq: req.body.filters[key][0]
//                 }
//             } else {
//                 findArgs[key] = req.body.filters[key];
//             }
//         }
//     }

//     console.log(findArgs)

//     if (term) {
//         Photo.find(findArgs)
//             .find({ $text: { $search: term } })
//             .populate("writer")
//             .sort([[sortBy, order]])
//             .skip(skip)
//             .limit(limit)
//             .exec((err, photos) => {
//                 if (err) return res.status(400).json({ success: false, err })
//                 res.status(200).json({ success: true, photos, postSize: photos.length })
//             })
//     } else {
//         Photo.find(findArgs)
//             .populate("writer")
//             .sort([[sortBy, order]])
//             .skip(skip)
//             .limit(limit)
//             .exec((err, photos) => {
//                 if (err) return res.status(400).json({ success: false, err })
//                 res.status(200).json({ success: true, photos, postSize: photos.length })
//             })
//     }

// });


//?id=${photoId}&type=single
//id=12121212,121212,1212121   type=array 
// router.get("/photos_by_id", (req, res) => {
//     let type = req.query.type
//     let photoIds = req.query.id

//     if (type === "array") {
//         let ids = req.query.id.split(',');
//         photoIds = [];
//         photoIds = ids.map(item => {
//             return item
//         })
//     }

//     //Find photo info that belongs to photo Id 
//     Photo.find({ '_id': { $in: photoIds } })
//         .populate('writer')
//         .exec((err, photo) => {
//             if (err) return req.status(400).send(err)
//             return res.status(200).send(photo)
//         })
// });



module.exports = router;
