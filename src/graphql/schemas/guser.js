exports.G_User = `
    type G_User {
        id: ID!
        uuid: String!
        roomsOwned: [Room!]
        firstName: String!
        lastName: String!
        email: String!
        phoneNumber: String!
    }
`;

exports.G_UserInputData = `
    input G_UserInputData {
        uuid: String!
        firstName: String!
        lastName: String!
        email: String!
        phoneNumber: String!
    }
`;

exports.G_UserMutations = `
    addUser(input: G_UserInputData!): G_User
`;
