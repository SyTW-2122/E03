const { Schema, model } = require("mongoose");

const filmSchema = new Schema({
  name: String,
  desc: String,
  gender: String,
  image: String
})

filmSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Film = model('Film', filmSchema)
module.exports = Film