var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var theSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    polarity: Number,
    id: Number,
    date: String,
    query:String,
    user: String
},
{collection: 'training.1600000.processed.noemoticon'})

module.exports = mongoose.model('post', theSchema);