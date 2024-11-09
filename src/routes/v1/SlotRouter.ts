import express, { Request, Response, NextFunction } from "express";

import { play, sim } from "../../controllers/slot";
import { playSchema, simSchema } from "../../schemas/slotSchemas";

const router = express.Router();

router.post(
  "/play",
  async (req: Request, res: Response, next: NextFunction) => {
    const { bet } = req.body;

    return await playSchema
      .strict()
      .noUnknown()
      .validate({ bet })
      .then(play)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
);

router.post("/sim", async (req: Request, res: Response, next: NextFunction) => {
  const { count, bet } = req.body;

  console.log(count);

  return await simSchema
    .strict()
    .noUnknown()
    .validate({ count, bet })
    .then(sim)
    .then((result) => res.status(200).json(result))
    .catch(next);
});

export { router };
