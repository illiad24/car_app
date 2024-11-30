import mongoose from "mongoose";

const { Schema } = mongoose

const dealerSchema = new Schema({
    dealerName: {
        type: String,
        required: [true, 'Dealer Name is required'],
        minlength: [2, 'Dealer Name must be at least 2 characters long'],
        maxlength: [50, 'Dealer Name must be at most 50 characters long'],
        trim: true,
    },
})

const Dealer = mongoose.model('Dealer', dealerSchema)

export default Dealer