exports.Room = `
    type Room {
        id: ID!
        price: Int!
        owner: G_User!
        location: String!
        isAvailable: Boolean!
        description: String!
        image: String
    }
`;

exports.RoomInputData = `
    input RoomInputData {
        price: Int
        location: String
        isAvailable: Boolean
        description: String
        uuid: String
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
