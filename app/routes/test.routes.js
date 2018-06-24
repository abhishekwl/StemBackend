module.exports = (app)=>{
    const tests = require("../controllers/test.controller.js");
    const apiUrl = require("../../config").apiUri+"/tests";

    app.post(apiUrl, tests.create);
    app.get(apiUrl+"/popular", tests.findPopular);
    app.get(apiUrl, tests.findAll);
    app.get(apiUrl+"/:testId", tests.findOne);
    app.put(apiUrl+"/:testId", tests.update);
    app.delete(apiUrl+"/:testId", tests.delete);
};