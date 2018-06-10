const Hospital = require("../models/hospital.model.js");

exports.create = (req,res)=>{
    if(req.body.uid && req.body.name && req.body.latitude && req.body.longitude && req.body.city) {
        Hospital.find({ uid: req.body.uid }, (err,data)=>{
            if(data.length) sendData("UID already exists, not creating a new entry.", null, req, res);
            else {
                const hospital = new Hospital({
                    uid: req.body.uid,
                    name: req.body.name,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    city: req.body.city,
                    image: req.body.image? req.body.image : ""
                });
                hospital.save((err,data)=>sendData(err,data,req,res));
            }
        }).limit(1);
    } else sendData("Missing POST body params.", null, req, res);
};

exports.findOne = (req,res)=>{
    Hospital.findOne({ uid: req.params.hospitalId }, (err,data)=>sendData(err,data,res));
};

function sendData(err,data,req,res) {
    const remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("\n["+req.method+"] "+remoteIp+" "+req.url);
    if(err) {
        console.log("[!ERR-HOSPITAL-CONTROLLER] "+err);
        res.status(400).json({ error: err });
    } else res.status(200).json(data);
}