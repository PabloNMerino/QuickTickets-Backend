import { Schema, model, Types } from "mongoose"

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    creatorId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
})

const Event = model("Events", eventSchema);

export default Event;