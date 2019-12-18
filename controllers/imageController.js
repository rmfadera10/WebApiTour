var image = require("../model/image.js");


function sValidation(req,res,next){
    if(req.file === undefined|null){
        res.status(500);
        res.json({
        status:500,
        messsage:"File cannot be empty"
            });
    }else{
        next();
    }
}

// this sUpload is a function to upload single image

function sUpload(req,res,next){
 // let date_ob = new Date().getTime();
 //code to insert image to database
    image.create({
        imageLocation:req.file.filename
    })
    .then(function(result){
        res.status(201);
        res.json({
            status:201,
            messsage:"Image uploaded sucessfully"
        });    
    })
.catch(function(err){
        next(err);
    });
}



//validation to check if the file is uploded or not

function mValidation(req,res,next){

    if(req.files === undefined|null){

        res.status(500);

        res.json({

        status:500,

        messsage:"File cannot be empty"

            });

            

    }else{

        next();

    }

    

}

//function to upload multiple images

function mUpload(req,res,next){

        images=req.files["images"];

        //counting the number images in array

        var count=images.length;

        for (i = 0; i < count; i++) {

           // console.log(images[i].filename);

            // let date_ob = new Date().getTime();

            image.create({

                imageLocation:images[i].filename

            })

            .then(function(result){

                res.status(201);    

                res.json({

                    status:201,

                    messsage:"Image uploaded sucessfully"

                });    

                

            })

            .catch(function(err){

                next(err);

            });

          }

    

    

}



module.exports={

    sValidation,sUpload,mValidation,mUpload

}