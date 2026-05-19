import mongoose from "mongoose";

const blockSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      unique: true,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Blocked = mongoose.model("Blocked", blockSchema);
export default Blocked;
