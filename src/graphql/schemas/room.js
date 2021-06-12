exports.Room = `
    type Room {
        id: ID!
        price: Int!
        owner: User!
        street: String
        town_city: String,
        parish: String!
        isAvailable: Boolean
        description: String!
        personalID: String
        image: String
    }
`;

exports.RoomInputData = `
    input RoomInputData {
        price: Int!
        street: String
        town_city: String
        parish: String!
        isAvailable: Boolean
        description: String!
        personalID: String
        image: String
    }
`;

exports.RoomQueries = `
    allRooms: [Room!]!
    getRoomById(id:ID!): Room!
    getRoomByOwner(ownerId: String!): [Room!]!
`;

exports.RoomMutations = `
    createRoom(input: RoomInputData): Room!
    updateRoom(input: RoomInputData, id: ID!): Room
    updateAvailability(id: ID!, isAvailable: Boolean!): Room
    deleteRoom(id: ID!): Room
`;
