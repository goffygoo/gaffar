import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  board: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Boards",
    },
  ],
});

const Lists = mongoose.model("Lists", listSchema);

export default Lists;
