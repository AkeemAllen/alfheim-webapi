exports.Room = `
    type Room {
        id: ID!
        occupancy: String!
        price: Int!
        gender: String!
        owner: User!
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
`;

exports.RoomMutations = `
    createRoom(input: RoomInputData): Room!
`;
