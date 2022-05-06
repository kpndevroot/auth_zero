import Mongoose from "mongoose";

const userSchema = Mongoose.Schema(
  {
    name: { type: String, required: true, min: 2 },
    email: { type: String, required: true, max: 200, min: 6 },
    password: { type: String, require: true, max: 1024, min: 6 },
    mobile: { type: String, required: true, min: 10, max: 10 },
    city: { type: String, required: false, min: 2 },
    date: { type: Date, default: Date.now },
    image: { type: String, require: false, default: "" },
    verified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export default Mongoose.model("User", userSchema);

