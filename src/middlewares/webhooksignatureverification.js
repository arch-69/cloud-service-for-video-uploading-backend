import crypto from "crypto";
import ApiError from "../utils/ApiError.js";

const verifySignature = async (req, res, next) => {
  const body = JSON.stringify(req.body);
  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    const receivedSignature = req.headers["x-razorpay-signature"];
    if (expectedSignature !== receivedSignature)
      return next(new ApiError(400, "invalid signature", null));

    next();
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, error.message, error.errors));
  }
};

export default verifySignature;
