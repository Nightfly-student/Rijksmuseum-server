import express from "express";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";

const collectionRouter = express.Router();

collectionRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res, next) => {
    try {
      const collection = await axios.get(
        `https://www.rijksmuseum.nl/api/en/collection/${req.params.id}?key=${process.env.RIJKSMUSEUM_API}`
      );
      res.status(200).send(collection.data);
    } catch (err) {
      next(err);
    }
  })
);

export default collectionRouter;
