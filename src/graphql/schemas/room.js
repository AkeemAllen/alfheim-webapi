exports.Room = `
    type Room {
        id: ID!
        occupancy: String!
        price: Int!
        gender: String!
        owner: User!
        location: Location!
    }
`;

exports.RoomInputData = `
    input RoomInputData {
        occupancy: String!
        price: Int!
        gender: String!
    }
`;

exports.RoomQueries = `
    allRooms: [Room!]!
    getRoomById(id:ID!): Room!
    getRoomByOwner(ownerId: ID!): Room!
`;

exports.RoomMutations = `
    createRoom(input: RoomInputData): Room!
`;
