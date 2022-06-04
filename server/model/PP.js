import mongoose from 'mongoose'

const ppSchema = new mongoose.Schema({
  img: {
    type: String,
  },
})

const PP = mongoose.model('PP', ppSchema)

export default PP
