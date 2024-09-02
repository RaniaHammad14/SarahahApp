const { default: mongoose } = require("mongoose");

module.exports.connection = () => {
  mongoose
    .connect("mongodb://localhost:27017/SarahahApp")
    .then(() => console.log("Connected to server"))
    .catch((error) => console.error(error));
};
