const mongoose = require('mongoose')
const Schema = mongoose.Schema


//Create Schema 

const ItemSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: {
        type: "String",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    DueDate: {
        type:Date
    },
    label: {
        type: "String",
        required: true
    },
    status: {
        type: "String",
        default: "New"
    }
});

module.exports = Item = mongoose.model("Item", ItemSchema);