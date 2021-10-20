require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  
  MONGO_URI: process.env.MONGO_URI,

  POST_PER_PAGE: parseInt(process.env.POST_PER_PAGE) || 3,
  
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || "randomaccesstoken",
};
