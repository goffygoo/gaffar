import mongoose from "mongoose";

const docsSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  box: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Box",
    },
  ],
});

const Docs = mongoose.model("Docs", docsSchema);

export default Docs;
