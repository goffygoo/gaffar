import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  mytasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tasks',
    },
  ],
  invites: [
    {
      project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
      project_name: {
        type: String,
      },
    },
  ],
  img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PP',
  },
})

const Users = mongoose.model('Users', userSchema)

export default Users
