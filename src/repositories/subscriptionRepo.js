import Subscription from "../models/subscription.js";

const createSubscription = (subscription) => Subscription.create(subscription);

const getSubscriptionByUserId = ({ userId }) =>
  Subscription.findOne({ userId });

const getSubscribedPlan = ({ userId }) =>
  Subscription.findOne({ userId, status: "ACTIVE" }).populate("plan");

const findBySubscriptionId = ({ subscriptionId }) =>
  Subscription.findOne({ subscriptionId });

export default {
  createSubscription,
  getSubscriptionByUserId,
  getSubscribedPlan,
  findBySubscriptionId,
};
