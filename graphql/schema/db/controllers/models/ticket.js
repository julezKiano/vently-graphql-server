const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

//so mongoose can stop throwing that warning
mongoose.Promise = global.Promise;

const ticketSchema = new Schema({
    eventTicket: {
        type : mongoose.Schema.Types.ObjectId, ref: 'EventTickets'
    },
    originalOwner: {
        type : mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    currentOwner: {
        type : mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    transactionId: {
        type : mongoose.Schema.Types.ObjectId, ref: 'Transaction',
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
