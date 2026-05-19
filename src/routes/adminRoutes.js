import express from "express";
import adminSchema from "../validations/adminSchema.js";
import auth from "../middlewares/auth.js";
import adminController from "../controllers/adminController.js";
import validate from "../middlewares/validate.js";
import blockController from "../controllers/blockController.js";

const adminRoutes = express.Router();

adminRoutes.post(
  "/create-plan",
  validate(adminSchema.planSchema),
  auth.authenticate,
  auth.authorize("admin"),
  adminController.createPlan,
);

adminRoutes.get(
  "/blocked-services-types",
  // auth.authenticate,
  // auth.authorize("admin"),
  blockController.getAllServiceTypes,
);

adminRoutes.put("/updateservice/:id", blockController.updateSerivce);
adminRoutes.get("/allservices", blockController.allService);
adminRoutes.get("/blocked-service", blockController.blockedServices);

export default adminRoutes;
