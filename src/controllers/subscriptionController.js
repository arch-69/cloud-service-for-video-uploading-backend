import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import subscriptionService from "../services/subscriptionService.js";

const generateSubscriptionId = asyncHandler(async (req, res) => {
  const { planId } = req.body;
  const user = req.user;
  // console.log(planId);
  const response = await subscriptionService.generateSubscriptionId({
    planId,
  });

  // console.log(user._id);

  await subscriptionService.createSubscription({
    subscriptionId: response,
    planId,
    userId: user._id,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, "subscription id generated successfully", response),
    );
});

const handleWebhookEvent = asyncHandler(async (req, res) => {
  console.log("webhook request: ", req.body);
  const response = await subscriptionService.handleWebhook(req.body);
  console.log(response);
  res.status(200).json({ message: "okay" });
});

export default {
  generateSubscriptionId,
  handleWebhookEvent,
};
