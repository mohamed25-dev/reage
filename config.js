require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  
  MONGO_URI: process.env.MONGO_URI,

  
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || "randomaccesstoken",
};
