import { model, Schema } from "mongoose";
import {
    DEFAULT_VALIDATION,
    EMAIL,
    URL,
} from "../../helpers/mongooseValidators.js";
import { Image } from "../../helpers/submodels/Image.js";

const cardSchema = new Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024,
    },
    email: EMAIL,
    web: URL,
    image: Image,
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: String,
        required: true,
    },
});

const Card = model("card", cardSchema);
export default Card;