import { Schema, model, Types } from "mongoose"

const orderSchema = new Schema({
    eventId: {
        type: Types.ObjectId,
        ref: "Event",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    buyerId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    creationDateTime: {
        type: Date,
        default: Date.now
    }
})

const Order = model("Orders", orderSchema);

export default Order;