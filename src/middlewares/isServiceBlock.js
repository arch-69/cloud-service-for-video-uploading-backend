import Blocked from "../models/block.js";
import ApiResponse from "../utils/ApiResponse.js";

const isBlock = (service) => async (req, res, next) => {
  const isService = await Blocked.findOne({ service });
  console.log(isService);
  if (!isService) return next();
  if (!isService.isBlocked) return next();
  return res
    .status(403)
    .json(
      new ApiResponse(403, `${isService.service} is temporiraly blocked`, null),
    );
};

export default isBlock;
