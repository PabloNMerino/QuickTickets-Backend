import { Schema, model } from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    }
})

const Category = model("Categories", categorySchema);

export default Category;