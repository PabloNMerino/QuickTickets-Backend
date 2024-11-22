import { Schema, model, Types } from "mongoose"

const ticketSchema = new Schema({
    eventId: {
        type: Types.ObjectId,
        ref: "Event",
        required: true,
    },
    buyerId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    purchaseDateTime: {
        type: Date,
        default: Date.now
    },
    qrCode: {
        type: String,
    },
    is_used: {
        type: Boolean,
        default: false,
    }
})

const Ticket = model("Tickets", ticketSchema);

export default Ticket;