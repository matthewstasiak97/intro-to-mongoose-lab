import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

export default mongoose.model("customers", customerSchema);
