import express from "express";
import expressAsyncHandler from "express-async-handler";
import Artist from "../models/artist.js";

const artistRouter = express.Router();

artistRouter.get(
  "/:artist",
  expressAsyncHandler(async (req, res, next) => {
    try {
      const artist = await Artist.findOne({ artist: { $regex: '^' + req.params.artist, $options: 'i' } });
      if (artist) {
        res.status(200).send(artist);
      } else {
        res.status(404).send({ message: "No Information Found" });
      }
    } catch (err) {
      next(err);
    }
  })
);

export default artistRouter;
