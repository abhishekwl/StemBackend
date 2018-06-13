const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
//LOCAL
const config = require("./config");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.get("/", (req,res)=>{
    res.status(200).json({ message: "All requests should be directed to /API endpoint." });
});


require("./app/routes/hospital.routes.js")(app);
require("./app/routes/test.routes.js")(app);
require("./app/routes/user.routes.js")(app);
app.listen(config.port, "0.0.0.0", ()=>{
    connectToDatabase();
    console.log("\n[SERVER] Listening on port "+config.port);
});

function connectToDatabase() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.dbUri).then(()=>{
        console.log("[DB] Hook to DB success\n");
    }).catch(err=>{
        console.log("[!ERROR-DB] "+err);
        process.exit();
    });
}