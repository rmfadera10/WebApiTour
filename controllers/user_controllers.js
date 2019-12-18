var user = require('../model/user.js')
var bcrypt = require('bcryptjs');



function hashGen(req,res,next){
    saltRounds = 10; 
    console.log('in has gen');
    bcrypt.hash(req.body.password,saltRounds)
    .then(function(hash){
        console.log(hash);
        req.userHash = hash;
        next();
    })
    .catch(function(err){
        next('has gen error')
    })
    
    }

function validation (req,res,next){
    // console.log(req.body.username);
    
    user.findOne({
        where:{username:req.body.username}
    })
    .then(function(result){
    // console.log(result);
    if(result === null){
    
    //res.send('user not found so registeed')
    next();
    }
    
    else{
    console.log('user was already registered');
    res.status(409);
    res.json({status:409, message:'You are already registered'});
    }
    })
    // .catch(function(err){
    
    // next(err)
    
    // })
    
    }

function registerUser (req,res){
   user.create({
    username: req.body.username,
    password: req.userHash,
    address: req.body.address
}).then(function (user) {
        if (user) {

        res.send(user);
    } else {
        res.status(400).send('Error in insert new record');
    }
});
    }

    function findallusers(req, res){
        user.findAll()
        .then(function (user) {
            if (user) {
    
            res.send(user);
        } else {
            res.status(400).send('Error in finding all data');
        }
    });
    }



    function deleteUser(req,res,next){
        if(req.params.id === null || undefined){
            res.json({status:500, message:'ID is not provided'})
        }
        user.destroy({
            where: {
                id:req.params.id
            }
        })
        .then(function(result){
            if(result === 0 ){
                res.json({status:404,message:'user not found'})
            }
            else{
        
            }
            console.log(result);
            res.status(200)
            res.json({status:200, message:'succesfully deleted'})
        
        })
        .catch(function(err){
        next(err);
        })
        
        
        }




    function updateUser(req,res,next){
	
        user.update({
            address:req.body.address,
            username:req.body.username
        },{
            where:{
                id:req.params.id
            }
        })
        .then(function(result){
            if(result === 0 ){
                res.json({status:404,message:'User not found, so not updated'})
            }
            else{
                res.json({status:200,message:'User updated'})
    
            }
        })
    .catch(function(err){
        res.json({status:500,message:'Error updating user !'})
    })
    
}
    
        
    module.exports = {
        registerUser,
        findallusers,
        validation,
        hashGen,
        updateUser,
        deleteUser
    }
