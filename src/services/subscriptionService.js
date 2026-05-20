import Plan from "../models/plan.js";
import razorpay from "../configs/razorpayconfig.js";
import ApiError from "../utils/ApiError.js";
import subscriptionRepo from "../repositories/subscriptionRepo.js";

const generateSubscriptionId = async ({ planId, user }) => {
  if (!planId) throw new ApiError(400, "planId is required", null);
  try {
    const isSubscribe = await subscriptionRepo.getSubscribedPlan({
      userId: user._id,
    });

    console.log("subscribed data ", isSubscribe, " and the user ", user);

    if (isSubscribe) throw new ApiError(409, "already subscribed", null);

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
    console.log("entity id ", entity.id);
    const subscription = await subscriptionRepo.findBySubscriptionId({
      subscriptionId: entity.id,
    });
    console.log(
      "from subscription service handlewebhook method ",
      subscription,
    );
    if (!subscription) throw new ApiError(404, "subscription not found", null);
    switch (event) {
      case "subscription.activated": {
        const data = {
          startedAt: new Date(entity.current_start * 1000),
          expiresAt: new Date(entity.current_end * 1000),
          status: entity.status.toUpperCase(),
        };
        return subscriptionRepo.updateSubscriptionById({
          _id: subscription._id,
          data,
        });
      }

      case "subscription.failed": {
        const data = {
          status: "PAST_DUE",
        };
        return subscriptionRepo.updateSubscriptionById({
          _id: subscription._id,
          data,
        });
      }

      case "subscription.cancelled": {
        const data = {
          status: "CANCELLED",
        };
        return subscriptionRepo.updateSubscriptionById({
          _id: subscription._id,
          data,
        });
      }
      case "subscription.charged": {
        const data = {
          startedAt: new Date(entity.current_start * 1000),
          expiresAt: new Date(entity.current_end * 1000),
          status: "ACTIVE",
        };
        return subscriptionRepo.updateSubscriptionById({
          _id: subscription._id,
          data,
        });
      }
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
