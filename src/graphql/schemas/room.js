exports.Room = `
    type Room {
        id: ID!
        price: String!
        owner: G_User!
        location: String!
        isAvailable: Boolean!
        description: String!
        expirationDate: String!
        contact: String!
        image: String
        urlHash: String
    }
`;

exports.RoomInputData = `
    input RoomInputData {
        price: String
        location: String
        isAvailable: Boolean
        description: String
        uuid: String
        expirationDate: String
        contact: String
        image: String
        urlHash: String
    }
`;

exports.RoomQueries = `
    allRooms: [Room!]!
    getRoomById(id:ID!): Room!
    getRoomByOwner(ownerId: String!): [Room!]!
    getRoomByDescription(description: String!): Room
`;

exports.RoomMutations = `
    createRoom(input: RoomInputData): Room!
    updateRoom(input: RoomInputData, id: ID!): Room
    updateAvailability(id: ID!, isAvailable: Boolean!): Room
    deleteRoom(id: ID!): Room
`;
