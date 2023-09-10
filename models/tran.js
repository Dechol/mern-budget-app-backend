const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tranSchema = new Schema({
    desc:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: false
    },
    isIncome:{
        type: Boolean,
        default: false,
    },
    isHighlighted:{
        type:Boolean,
        default: false
    },
    user_id: {
        type: String,
        required : true
    }
} , {timestamps: true})

module.exports = mongoose.model('Transaction',tranSchema)