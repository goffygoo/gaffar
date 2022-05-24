import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  response: {
    type: String,
  },
  request: {
    type: String,
  },
  method: {
    type: String,
  },
});

const Docsbox = mongoose.model("Docsbox", boxSchema);

export default Docsbox;
