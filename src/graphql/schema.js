const { buildSchema } = require("graphql");

const userSchema = require("./schemas/user");
const roomSchema = require("./schemas/room");
const locationSchema = require("./schemas/location");

module.exports = buildSchema(`
    ${userSchema.User}
    ${userSchema.UserInputData}
    ${userSchema.AuthData}
    
    ${locationSchema.Location}
    ${locationSchema.LocationInputData}
    
    ${roomSchema.Room}
    ${roomSchema.RoomInputData}


    type RootQuery {
        ${userSchema.UserQueries}
        ${roomSchema.RoomQueries}
        ${locationSchema.LocationQueries}
    }

    type RootMutation {
        ${userSchema.UserMutations}
        ${roomSchema.RoomMutations}
        ${locationSchema.LocationMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
