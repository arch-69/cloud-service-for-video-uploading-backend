import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import subscriptionService from "../services/subscriptionService.js";

const generateSubscriptionId = asyncHandler(async (req, res) => {
  const { planId } = req.body;
  console.log(planId);
  const response = await subscriptionService.generateSubscriptionId({ planId });
  return res
    .status(201)
    .json(
      new ApiResponse(201, "subscription id generated successfully", response),
    );
});

const handleWebhookEvent = asyncHandler(async (req, res) => {
  console.log("webhook request: ", req.body);
});

export default {
  generateSubscriptionId,
  handleWebhookEvent,
};
