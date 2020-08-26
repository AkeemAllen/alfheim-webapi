exports.Room = `
    type Room {
        id: ID!
        occupancy: String!
        price: Int!
        gender: String!
        owner: User!
        street: String!
        town_city: String!,
        parish: String!
        isAvailable: Boolean!
        isVisible: Boolean!
        amenities: [String!]!
        rules: [String!]!
        personalID: String!
        image: String
    }
`;

exports.RoomInputData = `
    input RoomInputData {
        occupancy: String
        price: Int
        gender: String
        street: String
        town_city: String
        parish: String
        isAvailable: Boolean
        isVisible: Boolean
        amenities: [String]
        rules: [String]
        personalID: String
        image: String
    }
`;

exports.RoomQueries = `
    allRooms: [Room!]!
    getRoomById(id:ID!): Room!
    getRoomByOwner(ownerId: ID!): [Room!]!
`;

exports.RoomMutations = `
    createRoom(input: RoomInputData): Room!
    updateRoom(input: RoomInputData, id: ID!): Room
    updateAvailability(id: ID!, isAvailable: Boolean!): Room
    updateVisibility(id: ID!, isVisible: Boolean!): Room
    addRule(id: ID!, rule: String!): Room
    addAmenity(id: ID!, amenity: String!): Room
    deleteRoom(id: ID!): Room
    deleteSingleRule(id: ID!, ruleToDelete: String!): Room
    deleteSingleAmenity(id: ID!, amenityToDelete: String!): Room
`;
