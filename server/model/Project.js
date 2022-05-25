import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lists",
    },
  doc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Docs",
  },
  members: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      role: {
        type: String,
      },
    },
  ],
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

const Projects = mongoose.model("Project", projectSchema);

export default Projects;
