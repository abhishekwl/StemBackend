const Hospital = require("../models/hospital.model.js");
const Test = require("../models/test.model.js");

exports.create = (req,res)=>{
    if(req.body.uid && req.body.name && req.body.latitude && req.body.longitude && req.body.city) {
        Hospital.findOne({ uid: req.body.uid }, (err,data)=>{
            if(data && !err) sendData("UID already exists, not creating a new Hospital.", null, req, res);
            else {
                const hospital = new Hospital({
                    uid: req.body.uid,
                    name: req.body.name,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    city: req.body.city.toLowerCase(),
                    image: req.body.image? req.body.image : ""
                });
                hospital.save((err,data)=>sendData(err,data,req,res));
            }
        });
    } else sendData("Missing POST body params.", null, req, res);
};

exports.findOne = (req,res)=>{
    Hospital.findOne({ uid: req.params.hospitalId }, (err,data)=>sendData(err,data,req,res));
};

exports.update = (req,res)=>{
    if(req.body) {
        Hospital.findOneAndUpdate({ uid: req.params.hospitalId }, { $set: req.body }, { new: true }, (err,data)=>{
            if(data && !err) Test.update({ "hospital.uid": req.params.hospitalId }, { $set: { hospital: data } }, { new: true }, ()=>sendData(err,data,req,res));
            else sendData("Hospital with provided UID does not exist", null, req, res);
        });
    } else sendData("Missing PUT body params", null, req, res);
};

exports.delete = (req,res)=>{
    Hospital.deleteOne({ uid: req.params.hospitalId }, (err,data)=>{
        if(data && !err) Test.deleteMany({ "hospital.uid": req.params.hospitalId }, ()=>sendData(err,data,req,res));
        else sendData("Hospital with provided UID does not exist", null, req, res);
    });
};

function sendData(err,data,req,res) {
    const remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("\n["+req.method+"] "+remoteIp+" "+req.url);
    if(err) {
        console.log("[!ERR-HOSPITAL-CONTROLLER] "+err);
        res.status(400).json({ error: err });
    } else res.status(200).json(data);
}