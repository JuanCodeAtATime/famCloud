const express = require('express');
const router = express.Router();
const { Photo } = require("../models/Photo");
const multer = require('multer');

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.gif') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             Photo
//=================================

router.post("/uploadImage", auth, (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});


router.post("/uploadPhoto", auth, (req, res) => {

    //save client datat into DB 
    const photo = new Photo(req.body)
    console.log(req.body)

    photo.save((err) => {
        if (err) returnres.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/getPhoto", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "year") {
                findArgs[key] = {
                    $eq: req.body.filters[key][0]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log(findArgs)

    if (term) {
        Photo.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, photos) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, photos, postSize: photos.length })
            })
    } else {
        Photo.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, photos) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, photos, postSize: photos.length })
            })
    }

});


//?id=${photoId}&type=single
//id=12121212,121212,1212121   type=array 
router.get("/photos_by_id", (req, res) => {
    let type = req.query.type
    let photoIds = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',');
        photoIds = [];
        photoIds = ids.map(item => {
            return item
        })
    }

    //Find photo info that belongs to photo Id 
    Photo.find({ '_id': { $in: photoIds } })
        .populate('writer')
        .exec((err, photo) => {
            if (err) return req.status(400).send(err)
            return res.status(200).send(photo)
        })
});



module.exports = router;
