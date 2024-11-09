import express from "express";
import cors from "cors";

import v1 from "./routes";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();
let port = 3008;

app.use(express.json());

app.use(cors());

app.use("/api/slot", v1.SlotRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
