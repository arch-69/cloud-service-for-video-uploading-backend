import cron from "node-cron";
import Subscription from "../models/subscription.js";

const initializeExpiryCronWorker = () => {
  console.log(
    "⏰ Subscription Expiry Cron Worker initialized and listening...",
  );

  // Runs exactly once a day at midnight (00:00)
  cron.schedule("0 0 * * *", async () => {
    console.log(`🔍 Expiry scanning started at: ${new Date().toISOString()}`);

    try {
      const now = new Date();

      const result = await Subscription.updateMany(
        {
          status: { $in: ["ACTIVE", "PAST_DUE"] },
          expiresAt: { $lt: now },
        },
        {
          $set: {
            status: "EXPIRED",
            autoRenew: false,
          },
        },
      );

      console.log(`Scan completed. Modified count: ${result.modifiedCount}`);

      if (result.modifiedCount > 0) {
        console.log(
          `✅ Cleaned up: ${result.modifiedCount} expired subscriptions.`,
        );
      }
    } catch (error) {
      console.error(
        "❌ Critical Cron Failure inside updateMany execution:",
        error,
      );
    }
  });
};

export default initializeExpiryCronWorker;
