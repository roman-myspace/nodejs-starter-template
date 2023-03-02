let mongoose = require("mongoose");
const constents = require("../utils/constents");
let mongo_url = constents.DB_URL;

async function initMongoDB () {
    options = {
        /* If mongo version is upgrade should use below connection properties */
        useNewUrlParser: true,
        useUnifiedTopology: true        
    }
    let mongo_connect = await mongoose.connect(mongo_url, options);
    if(mongo_connect) {
        console.log("MongoDB Connected!");
    } else {
        console.error("Failed to Connect to MongoDB");        
    }
}

module.exports = initMongoDB;