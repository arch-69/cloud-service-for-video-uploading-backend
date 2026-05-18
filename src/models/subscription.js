import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },

    subscriptionId: {
      type: String,
      unique: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "CANCELLED", "PAST_DUE"],
    },

    startedAt: {
      type: Date,
    },

    expiresAt: {
      type: Date,
    },

    autoRenew: Boolean,
  },
  { timestamps: true },
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
