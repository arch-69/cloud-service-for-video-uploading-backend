import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import adminService from "../services/adminService.js";

const getAllServiceTypes = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, "all service type", [
        "UPLOAD",
        "PAYMENT",
        "STREAMING",
      ]),
    );
});

const updateSerivce = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { block } = req.body;
  console.log(id, block);
  const response = await adminService.updateSerivce({ id, block });
  return res
    .status(200)
    .json(new ApiResponse(200, "updated successfully!", response));
});

const allService = asyncHandler(async (req, res) => {
  const services = await adminService.allService();
  return res.status(200).json(new ApiResponse(200, "all services", services));
});

const blockedServices = asyncHandler(async (req, res) => {
  const services = await adminService.blockedServices();
  return res.status(200).json(new ApiResponse(200, "all services", services));
});

export default {
  getAllServiceTypes,
  updateSerivce,
  allService,
  blockedServices,
};
