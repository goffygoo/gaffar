import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  listboards: Object
});

const Lists = mongoose.model("Lists", listSchema);

export default Lists;
