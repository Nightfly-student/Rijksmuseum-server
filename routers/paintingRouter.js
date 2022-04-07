import express from "express";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";

const paintingRouter = express.Router();

paintingRouter.get(
  "/painter",
  expressAsyncHandler(async (req, res, next) => {
    try {
      const data = await axios
        .get(
          `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.RIJKSMUSEUM_API}&p=${req.query.p}&ps=${req.query.ps}&involvedMaker=${req.query.involvedMaker}`
        )
        .catch((err) => {
          console.log(err);
          res.status(500).send({ message: "Internal Server Error" });
        });
      res.status(200).send(data.data);
    } catch (err) {
      next(err);
    }
  })
);

paintingRouter.get(
  "/search",
  expressAsyncHandler(async (req, res, next) => {
    var encode = '';
    if(req.query.normalized32Colors.length != 0) {
      encode = (encodeURIComponent(req.query.normalized32Colors.substring(0,1)) + req.query.normalized32Colors.slice(1)).toUpperCase();
    }
    try {
      const search = await axios.get(
        `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.RIJKSMUSEUM_API}&p=${req.query.p}&ps=10&q=${req.query.q}&material=${req.query.material}&technique=${req.query.technique}&involvedMaker=${req.query.involvedMaker}&f.normalized32Colors.hex=${encode}&imgonly=${req.query.imgonly}&toppieces=${req.query.toppieces}}`
      );
      if(search.data.count != 0) {
        res.status(200).send(search.data);
      } else {
        res.status(404).send({message: 'Could not find any art'});
      }

    } catch (err) {
      next(err);
    }
  })
);

export default paintingRouter;
