var express = require('express');
var router = express.Router();
var path=require('path')
var fs=require('fs')
var mongoose=require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/blog',function(err){
    if(err){
      throw err
    }else{
      console.log("数据库连接成功")
    }
  })
// 定义骨架
  var schema=new mongoose.Schema({
    img:String
  })
 //创建model
  var models=mongoose.model('img',schema,'img')

router.post('/file_upload', function(req, res, next) {
  //  console.log(req.files[0]);  // 上传的文件信息
    var des_file = 'public/'+"/images"+ "/"+  req.files[0].originalname;
    console.log(path.join(des_file))
    fs.readFile( req.files[0].path, function (err, data) {
      var list=new models();
        list.img="images"+ "/"+  req.files[0].originalname;;
        list.save(function(err){
              console.log('添加成功')
        })
         fs.writeFile(des_file, data, function (err) {
          if( err ){
               console.log( err );
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files[0].originalname
               };
           }
           res.end(data);
        });
    });
});

router.get('/img',function(req,res){
   models.findById('5caaf5630997f6380848ead1').exec(function(err,data){
     console.log(data) //  images/网络爬虫.png
   // fs.writeFileSync('66666.jpg',bitmap);
    res.render('index.ejs',{imgs:data.img})
  })
})
module.exports = router;
