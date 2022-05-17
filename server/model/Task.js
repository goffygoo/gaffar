import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  name: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
  desc: {
    type: String,
    required: true,
  },
});

const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks;
