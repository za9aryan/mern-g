const { model, Schema } = require("mongoose");

const carSchema = new Schema({
    model: String,
    year: String
})

module.exports = model("Car", carSchema)