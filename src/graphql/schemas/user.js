exports.User = `
    type User {
        id: ID!
        uuid: String!
        email: String!
        username: String
        password: String
        firstname: String
        lastname: String
        roomsOwned: [Room!]
        contact: String
    }
`;

exports.UserInputData = `
    input UserInputData {
        email: String!
        username: String
        password: String
        firstname: String
        lastname: String
        contact: String
        uuid: String
    }
`;

exports.AuthData = `
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
        firstTimeLogIn: Boolean!
    }
`;

exports.UserQueries = `
    allUsers: [User!]!
    getUserByEmail(email:String!): User!
    getUserById(id: ID!): User!
    login(email:String!,password:String!): AuthData!
`;

exports.UserMutations = `
    createUser(userInput:UserInputData!): User
    updateUser(userInput:UserInputData): User!
`;
