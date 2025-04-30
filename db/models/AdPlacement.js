import mongoose from "mongoose";

const { Schema } = mongoose;

const adPlacementSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
    text: { type: String, required: true },
});

const Adplacement =
    mongoose.models.Adplacement ||
    mongoose.model("Adplacement", adPlacementSchema);

export default Adplacement;