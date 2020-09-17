const { buildSchema } = require("graphql");

const userSchema = require("./schemas/user");
const roomSchema = require("./schemas/room");
const g_userSchema = require("./schemas/guser");

module.exports = buildSchema(`
    ${userSchema.User}
    ${userSchema.UserInputData}
    ${userSchema.AuthData}
    
    ${roomSchema.Room}
    ${roomSchema.RoomInputData}

    ${g_userSchema.G_User}
    ${g_userSchema.G_UserInputData}

    type RootQuery {
        ${userSchema.UserQueries}
        ${roomSchema.RoomQueries}
    }

    type RootMutation {
        ${userSchema.UserMutations}
        ${roomSchema.RoomMutations}
        ${g_userSchema.G_UserMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
