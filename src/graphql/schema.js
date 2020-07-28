const { buildSchema } = require("graphql");

const userSchemas = require("./schemas/user");

module.exports = buildSchema(`
    ${userSchemas.User}
    ${userSchemas.UserInputData}
    ${userSchemas.AuthData}

    type RootQuery {
        ${userSchemas.UserQueries}
    }

    type RootMutation {
        ${userSchemas.UserMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
