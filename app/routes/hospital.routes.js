module.exports = (app)=>{
    const hospitals = require("../controllers/hospital.controller.js");
    const apiUrl = require("../../config").apiUri+"/hospitals";

    app.post(apiUrl, hospitals.create);
    app.get(apiUrl+"/:hospitalId", hospitals.findOne);
    app.put(apiUrl+"/:hospitalId", hospitals.update);
    app.delete(apiUrl+"/:hospitalId", hospitals.delete);
};