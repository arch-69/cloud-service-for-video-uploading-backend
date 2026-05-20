import app from "./app.js";
import dotenv from "dotenv";
import initializeExiryCronWorkder from "./utils/expiry-cron.js";
dotenv.config({});
import connectDB from "./configs/db.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is running on port", process.env.PORT);
      initializeExiryCronWorkder();
    });
  })
  .catch((err) => {
    console.error(err);
  });
