import Plan from "../models/plan.js";
import razorpay from "../configs/razorpayconfig.js";
import ApiError from "../utils/ApiError.js";

const generateSubscriptionId = async ({ planId }) => {
  if (!planId) throw new ApiError(400, "planId is required", null);
  try {
    const plan = await Plan.findById(planId);
    if (!plan) throw new ApiError(404, "plan not found", null);

    const subscription = await razorpay.subscriptions.create({
      plan_id: plan.rzPlanId,

      customer_notify: 1,

      total_count: 12,
    });

    return subscription.id;
  } catch (err) {
    throw new ApiError(500, err.message, err.errors);
  }
};

export default {
  generateSubscriptionId,
};
