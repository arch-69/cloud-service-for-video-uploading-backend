import express from "express";
import auth from "../middlewares/auth.js";
import subscriptionCtr from "../controllers/subscriptionController.js";
import verifySignature from "../middlewares/webhooksignatureverification.js";

const subscriptionRoutes = express.Router();

subscriptionRoutes.post(
  "/get-subscription-id",
  auth.authenticate,
  auth.authorize("user", "admin"),
  subscriptionCtr.generateSubscriptionId,
);

subscriptionRoutes.post(
  "/webhook",
  verifySignature,
  subscriptionCtr.handleWebhookEvent,
);

export default subscriptionRoutes;
