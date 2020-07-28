exports.Location = `
    type Location {
        id: ID!
        street: String!
        town_city:String!
        parish: String!
        room: Room!
    }
`;

exports.LocationInputData = `
    input LocationInputData {
        street: String!
        town_city:String!
        parish: String!
        room: ID!
    }
`;

exports.LocationQueries = `
    allLocations: [Location!]!
`;

exports.LocationMutations = `
    addLocation(input: LocationInputData): Location!
`;
