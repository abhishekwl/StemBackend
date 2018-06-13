const User = require("../models/user.model.js");

exports.create = (req,res)=>{
    if(req.body.uid && req.body.name && req.body.age && req.body.blood && req.body.gender && req.body.contact) {
        const user = new User({
            uid: req.body.uid,
            name: req.body.name,
            age: req.body.age,
            blood: req.body.blood,
            gender: req.body.gender.toString().toLowerCase()==="male"? true: false,
            contact: req.body.contact,
            image: req.body.image? req.body.image : "",
            additional: req.body.additional? req.body.additional : ""
        });
        user.save((err,data)=>sendData(err,data,req,res));
    } else sendData("Missing POST body params", null, req, res);
};

exports.findOne = (req,res)=>{
    User.findOne({ uid: req.params.uid }, (err,data)=>sendData(err,data,req,res));
};

exports.update = (req,res)=>{
    if(req.body) {
        User.findOneAndUpdate({ uid: req.params.uid }, { $set: req.body }, { new: true }, (err,data)=>sendData(err,data,req,res));
    } else sendData("Missing PUT Body params", null, req, res);
};

exports.delete = (req,res)=>{
    User.deleteOne({ uid: req.params.uid }, (err,data)=>sendData(err,data,req,res));
};

function sendData(err,data,req,res) {
    const remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("\n["+req.method+"] "+remoteIp+" "+req.url);
    if(err) {
        console.log("[!ERR-USER-CONTROLLER] "+err);
        res.status(400).json({ error: err });
    } else res.status(200).json(data);
}