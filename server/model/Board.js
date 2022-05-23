import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  columns: {
    type: Object,
  },
});

const Boards = mongoose.model("Boards", boardSchema);

export default Boards;
