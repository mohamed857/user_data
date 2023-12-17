const express = require('express');
const router = express.Router();
const multer =require('multer');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let fileName='';
const myStorage =multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect)=>{
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        fileName = fl;
    }
}) 

const upload =multer({storage:myStorage});

router.post('/login', async(req,res)=>{
    dta = req.body;
    user = await User.findOne({email: data.email})
    if(!user){
        res.status(401).send(' invalid email or password');
    }
    else{
        validPass = bcrypt.compareSync(data.password, user.password);
        if(!validPass){
            res.status(401).send('invalid email or password');
        }
        else{
            payload = {
                _id: user.passwd,
                name: user.name,
                email: user.email
            }
            token = jwt.sign(payload, '1234567');
            res.status(200).send({mytoken: token});
        }
    }
})

router.post('/register', async (req,res)=>{
    data = req.body;
    usr = new User(data);
    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(data.password , salt);
    usr.password = cryptedPass;
    usr.save()
        .then(
            (savedUser)=>{
                res.status(200).send(savedUser)
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.post('/add', (req,res)=>{
    data = req.body;
    usr = new User(data);
    usr.save()
        .then (
        (savedUser)=>{
            res.send(savedUser)
        }
    )
     .catch  (
        (err)=>{
            res.send(err)
        }
     )
        
    
    console.log("add work")

})

router.post('/create', async (req,res)=>{
    try {
       dta =req.body;
       usr = new User(data);
       savedUser  =await usr.save();
       res.send(savedUser);
    } catch (error) {
        res.send(error)
    }
})

router.get('/getall' , (req,res)=>{
    User.find({age: 21})
        .then(
            (user)=>{
                res.send(user)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
} )

router.delete('/delete/:id', (req,res)=>{
    id =req.params.id;
    User.findOneAndDelete({_id:id})
        .then(
            (deletedUser)=>{
                res.send(deletedUser)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})

router.delete('/del/:id', async (req,res)=>{
    try {
        id=req.params.id
        deletedUser = await User.findOneAndDelete({_id:id})
        res.send(deletedUser)
    } catch (error) {
        res.send(error)
    }
})


module.exports=router;