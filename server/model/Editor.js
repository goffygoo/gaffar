import mongoose from "mongoose";

const editorSchema = new mongoose.Schema(
  {
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },
    contents: Object
  },
  {
    timestamps: true,
  }
);

const Editor = mongoose.model("Editors", editorSchema);

export default Editor;