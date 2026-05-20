import Subscription from "../models/subscription.js";

const createSubscription = (subscription) => Subscription.create(subscription);

const getSubscriptionByUserId = ({ userId }) =>
  Subscription.findOne({ userId });

const getSubscribedPlan = ({ userId }) =>
  Subscription.findOne({ userId, status: "ACTIVE" }).populate("plan");

const findBySubscriptionId = ({ subscriptionId }) =>
  Subscription.findOne({ subscriptionId });

const updateSubscriptionById = ({ _id, data }) => {
  if (!data) return;
  let sbs = {};

  if (data.user !== undefined) sbs.user = data.user;
  if (data.plan !== undefined) sbs.plan = data.plan;
  if (data.status !== undefined) sbs.status = data.status;
  if (data.startedAt !== undefined) sbs.startedAt = data.startedAt;
  if (data.expiresAt !== undefined) sbs.expiresAt = data.expiresAt;
  if (data.autoRenew !== undefined) sbs.autoRenew = data.autoRenew;

  return Subscription.findByIdAndUpdate(
    _id,
    {
      $set: sbs,
    },
    { returnDocument: "after" },
  );
};
export default {
  createSubscription,
  getSubscriptionByUserId,
  getSubscribedPlan,
  findBySubscriptionId,
  updateSubscriptionById,
};
