module.exports = (app)=>{
    const users = require("../controllers/user.controller.js");
    const apiUrl = require("../../config").apiUri+"/users";

    app.post(apiUrl, users.create);
    app.get(apiUrl+"/:uid", users.findOne);
    app.put(apiUrl+"/:uid", users.update);
    app.delete(apiUrl+"/:uid", users.delete);
};