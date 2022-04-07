import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    artist: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
  },
);

const Artist = mongoose.model("Artist", artistSchema);
export default Artist;