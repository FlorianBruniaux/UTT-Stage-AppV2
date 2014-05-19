var $ = require('jquery'),
    fs = require('fs');
   
exports.uploadBase64Image = function(_req, _res){

    console.log("uploadBase64Image");
    
    var base64Data = _req.body.base64Data,
        title = _req.body.title,
        folder = _req.body.folder;
    
    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
        
        if (matches.length !== 3) {
            return 'ERROR';
        }
        
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        
        return response;
    }
    
    var imageBuffer = decodeBase64Image(base64Data);
    
    if (imageBuffer !== 'ERROR') {
        
        //  Create file from stream...
        //  ...in images folder
        fs.writeFile('app/images/'+folder+'/'+title+'.png', imageBuffer.data, function(err) {
            console.log(err);
        });
        
        _res.send('Image '+title+' has been uploaded in : images/'+folder);

    }else{
        _res.send('Error, please try Again.');
    }
}