var _getCommonViewData = function() {
    return {
        development: true
    };
}

exports.home = function(req, res) {

    var viewData = _getCommonViewData()
    viewData.title = 'PicTalk';
    viewData.imageSrc = false;

    res.render('home', viewData)
};

exports.uploadHandler = function(req, res) {

    var image = req.files.image
    
    if (!image) {
        res.send({res: false});
        return false;    
    }
    
    var fs = require('fs'),
        path = require('path');

    fs.readFile(image.path, function (err, data) {
        // asynchronously reads the entire contents of an image file
        var uploadDir = path.join(__dirname, '../', '/public/uploads/');
        var imgId = new Date().getTime();
        var savePath = uploadDir + imgId + '.png';
        fs.writeFile(savePath, data, function (err) {
            if (err) throw err;
            res.send({imgId: imgId});
        });
    });
};

exports.imageHandler = function(req, res) {
    console.log(req);

    var viewData = _getCommonViewData();
    viewData.title = 'PicTalk';
    viewData.imageSrc = '/uploads/' + req.route.params.imageId + '.png';

    res.render('home', viewData)
};