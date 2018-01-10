const graphql = require('graphql');
const casual = require('casual');
const mock = require('./mock');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        verificationCode: { type: GraphQLInt },
        isActivated: { type: GraphQLBoolean },
        interests: {
            type: new GraphQLList(InterestType),
            resolve(parentValue, args) {
                return mock.interests()
            }
        },
        tickets: {
            type: new GraphQLList(TicketType),
            resolve(parentValue, args) {
                return mock.tickets()
            }
        },
        transactions: {
            type: new GraphQLList(TransactionType),
            resolve(parentValue, args) {
                return mock.transactions()
            }
        }
    })
});

const EventManagerType = new GraphQLObjectType({
    name: 'EventManagerType',
    fields: () => ({
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        verificationCode: { type: GraphQLInt },
        isActivated: { type: GraphQLBoolean },
        events: {
            type: new GraphQLList(EventType),
            resolve(parentValue, args) {
                return mock.events()
            }
        }
    })
});

const EventType = new GraphQLObjectType({
    name: 'EventType',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        locationName: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat },
        okhi: { type: GraphQLString },
        description: { type: GraphQLString },
        bannerUrl: { type: GraphQLString },
        isActive: { type: GraphQLBoolean },
        isClosed: { type: GraphQLBoolean },
        isFree: { type: GraphQLBoolean },
        eventManager: {
            type: EventManagerType,
            resolve(parentValue, args) {
                return mock.eventManagers(true)
            }
        },
        tickets: {
            type: new GraphQLList(TicketType),
            resolve(parentValue, args) {
                return mock.tickets()
            }
        },
        attendees: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return mock.users()
            }
        }
    })
});

const TicketType = new GraphQLObjectType({
    name: 'TicketType',
    fields: () => ({
        _id: { type: GraphQLID },
        type: { type: GraphQLString },
        price: { type: GraphQLFloat },
        currency: { type: GraphQLString },
        originalOwner: {
            type: UserType,
            resolve(parentValue, args) {
                return mock.users(true)
            }
        },
        currentOwner: {
            type: UserType,
            resolve(parentValue, args) {
                return mock.users(true)
            }
        },
        eventManager: {
            type: EventManagerType,
            resolve(parentValue, args) {
                return mock.eventManagers(true)
            }
        },
        event: {
            type: EventType,
            resolve(parentValue, args) {
                return mock.events(true)
            }
        },
        transaction: {
            type: TransactionType,
            resolve(parentValue, args) {
                return mock.transactions(true)
            }
        }
    })
});

const TransactionType = new GraphQLObjectType({
    name: 'TransactionType',
    fields: () => ({
        _id: { type: GraphQLID },
        reference: { type: GraphQLString },
        date: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        paymentMethod: { type: GraphQLString },
        status: { type: GraphQLID },
        user: {
            type: UserType,
            resolve(parentValue, args) {
                return mock.users(true)
            }
        },
        event: {
            type: EventType,
            resolve(parentValue, args) {
                return mock.events(true)
            }
        },
        tickets: {
            type: GraphQLList(TicketType),
            resolve(parentValue, args) {
                return mock.tickets()
            }
        }
    })
});

const InterestType = new GraphQLObjectType({
    name: 'InterestType',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        events: {
            type: new GraphQLList(EventType),
            resolve(parentValue, args) {
                return mock.events()
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return mock.users()
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type : UserType,
            args: { _id: { type: GraphQLID } },
            resolve (parentValue, args, context) {
                return mock.users(true);
            }
        },
        event: {
            type: EventType,
            args: { _id: { type: GraphQLID } },
            resolve (parentValue, args, context) {
                return mock.events(true);
            }
        },
        ticket: {
            type: TicketType,
            args: { _id: { type: GraphQLID } },
            resolve(parentValue, args, context) {
                return mock.tickets(true);
            }
        },
        transaction: {
            type: TransactionType,
            args: { _id: { type: GraphQLID } },
            resolve(parentValue, args, context) {
                return mock.transactions(true);
            }
        },
        eventManager: {
            type: EventManagerType,
            args: { _id: { type: GraphQLID } },
            resolve(parentValue, args, context) {
                return mock.eventManagers(true);
            }
        },
        interest: {
            type: InterestType,
            args: { _id: { type: GraphQLID } },
            resolve(parentValue, args, context) {
                return mock.interests(true);
            }
        }
    }
});




module.exports = RootQuery;
