const express = require('express');
const routes = express();
const config = require('../config');
const models = require('../models');
const { Transaction, Ticket } = models;

const PesaPal = require('pesapaljs').init({
    key: config.pesapalDemoKey,
    secret: config.pesapalDemoSecret,
    debug: true // false in production!
});

routes.get('/', PesaPal.paymentListener, async (req, res) => {
    const payment = req.payment;
    const {transaction, method, status, reference} = payment;
    const paymentInfo = {
        transactionPaymentMethod: method.toLowerCase(),
        status: status.toLowerCase(),
        pesapalTransactionId: transaction
    }
    const updatedTransaction = await Transaction.findByIdAndUpdate(reference, paymentInfo, { new: true });
    generateTickets(updatedTransaction);
});

const generateTickets = async (transaction) => {
    const { _id, userId, tickets, status, transactionPaymentMethod } = transaction;
    if( !(await Ticket.findOne({ transactionId: _id })) ) {
        if(status === 'completed' || status === 'pending') {
            for (let { eventTicket, totalTickets } of tickets) {
                let ticketsToBeCreated =  [];
                for (var i = 0; i < totalTickets; i++) {
                    ticketsToBeCreated.push({
                        eventTicket,
                        originalOwner: userId,
                        currentOwner: userId,
                        transactionId: _id
                    });
                }
                for (let ticket of ticketsToBeCreated) {
                    let newTicket = new Ticket(ticket)
                    await newTicket.save();
                    console.log('ticket generated');
                }
            }
        } else {
            console.log('transaction failed. can not generate tickets');
        }
    } else {
        console.log('tickets with this transaction has alreasy been generated');
    }
}

module.exports = routes;
