import Subscription from "../models/subscription.js";

const createSubscription = ({ subscription }) =>
  Subscription.create(subscription);

const getSubscriptionByUserId = ({ userId }) =>
  Subscription.findOne({ userId });

const getSubscribedPlan = ({ userId }) =>
  Subscription.findOne({ userId, status: "ACTIVE" }).populate("plan");

export default {
  createSubscription,
  getSubscriptionByUserId,
  getSubscribedPlan,
};
