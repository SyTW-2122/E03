const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  name: String
})

roleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Role = model('Role', roleSchema)
module.exports = Role