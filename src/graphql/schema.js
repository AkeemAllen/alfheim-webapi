const { buildSchema } = require("graphql");

const userSchema = require("./schemas/user");
const roomSchema = require("./schemas/room");

module.exports = buildSchema(`
    ${userSchema.User}
    ${userSchema.UserInputData}
    ${userSchema.AuthData}
    
    ${roomSchema.Room}
    ${roomSchema.RoomInputData}

    type RootQuery {
        ${userSchema.UserQueries}
        ${roomSchema.RoomQueries}
    }

    type RootMutation {
        ${userSchema.UserMutations}
        ${roomSchema.RoomMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
