const { buildSchema } = require("graphql");

const userSchemas = require("./schemas/user");
const roomSchemas = require("./schemas/room");

module.exports = buildSchema(`
    ${userSchemas.User}
    ${userSchemas.UserInputData}
    ${userSchemas.AuthData}

    ${roomSchemas.Room}
    ${roomSchemas.RoomInputData}

    type RootQuery {
        ${userSchemas.UserQueries}
        ${roomSchemas.RoomQueries}
    }

    type RootMutation {
        ${userSchemas.UserMutations}
        ${roomSchemas.RoomMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
