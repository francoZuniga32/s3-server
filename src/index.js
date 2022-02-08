var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
const crypto = require("crypto");
require('dotenv').config();

var app = express()
/**
 * cofiguraciones de acceso a aws.
 */
var s3 = new aws.S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

/**
 * configuracion de carga de archivos a s3
 */
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null,{

      });
    },
    key: function (req, file, cb) {
      cb(null, encriptfile(file.originalname));
    }
  })
}).single('file');

/**
 * esta funcion retorna el nombre encritado de un archivo.
 * @param {String} filename nombre original del archivo 
 * @returns nombre encriptado
 */
function encriptfile(filename) {
  return (
      crypto.createHash("sha1").update(filename).digest("hex") +
      "." +
      filename.split(".")[1]
  );
}

/**
 * funcion que expone un endpoint post para la carga del archivo.
 */
app.post('/upload', async(req, res)=>{
  upload(req, res, async(err)=>{
    if(err) console.log(err);
    console.log(req.file);
    res.send(req.file);
  })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`listen on port ${process.env.PORT || 3000}`);
})