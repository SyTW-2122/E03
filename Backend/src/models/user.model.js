const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = model('User', userSchema)
module.exports = User