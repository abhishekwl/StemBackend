const Test = require("../models/test.model.js");
const Hospital = require("../models/hospital.model.js");
const User = require("../models/user.model.js");

exports.create = (req,res)=>{
    if(req.body.name && req.body.price && req.body.hospital) {
        Hospital.findById(req.body.hospital, (err,data)=>{
            if(data) {
                const test = new Test({
                    name: req.body.name.toLowerCase(),
                    price: req.body.price,
                    hospital: data
                });
                test.save((err,data)=>sendData(err,data,req,res));
            } else sendData("Hospital with provided ID does not exist", null, req, res);
        }).limit(1);
    } else sendData("Missing POST body params.", null, req, res);
};

exports.findAll = (req,res)=>{
    if(req.query.uid && req.query.test) {
        User.findOne({ uid: req.query.uid }, (err,data)=>{
            if(data && !err) Test.find({ $text: { $search: req.query.test }, "hospital.city": req.query.city.toLowerCase() }, (err,data)=>sendData(err,data,req,res));
            else sendData("Invalid UID", null, req, res);
        });
    } else sendData("Missing Query Params CITY or UID or Test", null, req, res);
};

exports.findOne = (req,res)=>{
    if(req.query.uid) {
        User.findOne({ uid: req.query.uid }, (err,data)=>{
            if(data && !err) Test.findById(req.params.testId, (err,data)=>sendData(err,data,req,res));
            else sendData("Invalid UID", null, req, res);
        });
    } else sendData("Missing Query Param UID", null, req, res);
};

exports.update = (req,res)=>{
    if(req.body && req.query.uid) {
        Hospital.findOne({ uid: req.query.uid }, (err,data)=>{
            if(data && !err) Test.findOneAndUpdate({ _id: req.params.testId, "hospital.uid": req.query.uid }, { $set: req.body }, { new: true }, (err,data)=>sendData(err,data,req,res));
            else sendData("Unauthorized Update", null, req, res);
        });
    } else sendData("Missing PUT Body Params or Hospital UID", null, req, res);
};

exports.delete = (req,res)=>{
    if(req.query.uid) {
        Hospital.findOne({ uid: req.query.uid }, (err,data)=>{
            if(data && !err) Test.deleteOne({ _id: req.params.testId, "hospital.uid": req.query.uid }, (err,data)=>sendData(err,data,req,res));
            else sendData("Unauthorized Deletion", null, req ,res);
        });
    } else sendData("Missing Query Param Hospital UID", null, req, res);
};

function sendData(err,data,req,res) {
    const remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("\n["+req.method+"] "+remoteIp+" "+req.url);
    if(err) {
        console.log("[!ERR-TEST-CONTROLLER] "+err);
        res.status(400).json({ error: err });
    } else res.status(200).json(data);
}