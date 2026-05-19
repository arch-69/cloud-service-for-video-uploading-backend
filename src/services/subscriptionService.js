import Plan from "../models/plan.js";
import razorpay from "../configs/razorpayconfig.js";
import ApiError from "../utils/ApiError.js";
import subscriptionRepo from "../repositories/subscriptionRepo.js";

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

const createSubscription = async ({ subscriptionId, planId, userId }) => {
  try {
    const isExist = await subscriptionRepo.findBySubscriptionId({
      subscriptionId,
    });

    if (isExist) throw new ApiError(400, "subscription is already exist");

    const subscription = await subscriptionRepo.createSubscription({
      subscriptionId,
      plan: planId,
      user: userId,
    });

    return subscription;
  } catch (err) {
    throw new ApiError(500, err.message, err.errors);
  }
};

const handleWebhook = async ({ event, payload }) => {
  const entity = payload.subscription.entity;
  try {
    const subscription = await subscriptionRepo.findBySubscriptionId(entity.id);
    console.log(
      "from subscription service handlewebhook method ",
      subscription,
    );
    if (!subscription) throw new ApiError(404, "subscription not found", null);
    switch (event) {
      case "subscription.activated":
        {
        }
        break;
    }
  } catch (error) {
    throw new ApiError(500, error.message, error.errors);
  }
};

export default {
  generateSubscriptionId,
  createSubscription,
  handleWebhook,
};
