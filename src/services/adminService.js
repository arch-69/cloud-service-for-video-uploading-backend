import Blocked from "../models/block.js";
import adminRepo from "../repositories/adminRepo.js";
import ApiError from "../utils/ApiError.js";

const createPlan = async (data) => {
  try {
    const isExist = await adminRepo.findByName({ name: data.name });
    if (isExist)
      throw new ApiError(409, "plan already exist with this name", null);
    const plan = await adminRepo.createPlan(data);
    return plan;
  } catch (error) {
    throw new ApiError(500, error.message, error.errors);
  }
};

const getPlans = async () => {
  return await adminRepo.getPlans();
};

const updateSerivce = async ({ id, block }) => {
  return await Blocked.findByIdAndUpdate(
    id,
    {
      $set: {
        isBlocked: block,
      },
    },
    { returnDocument: "after" },
  );
};

const allService = async () => {
  return Blocked.find();
};

const blockedServices = async () => {
  return Blocked.find({ isBlocked: true });
};

export default {
  createPlan,
  getPlans,
  updateSerivce,
  allService,
  blockedServices,
};
