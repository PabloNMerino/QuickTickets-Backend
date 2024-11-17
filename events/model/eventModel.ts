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
    availability: {
        type: Number,
        required: false,
      },
    category: {
        type: String,
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
    is_active: {
        type: Boolean,
        default: true,          
    }
})

eventSchema.pre("save", function (next) {
    if(this.isNew)  {
        this.availability = this.capacity;
    }

    next();
});

const Event = model("Events", eventSchema);

export default Event;