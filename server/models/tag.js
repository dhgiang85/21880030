// tags like stackoverflow
import mongoose from "mongoose";
const { Schema } = mongoose;

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^[A-z][A-z0-9-_]{3,23}$/.test(value);
            }
        }
    },
    description: {
        type: String,
        trim: true,
    },
    isPopular: {
        type: Boolean,
        default: false,        
    },

});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;