import mongoose from "mongoose";

const docsSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  contents: [
    {
      data: {
        type: String,
      },
      typecon: {
        type: String,
        required: true,
      },
    },
  ],
});

const Docs = mongoose.model("Docs", docsSchema);

export default Docs;
