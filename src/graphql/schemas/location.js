exports.Location = `
    type Location {
        id: ID!
        street: String!
        town_city:String!
        parish: String!
    }
`;

exports.LocationInputData = `
    input LocationInputData {
        street: String!
        town_city:String!
        parish: String!
    }
`;

exports.LocationQueries = `
    allLocations: [Location!]!
`;

exports.LocationMutations = `
    addLocation(input: LocationInputData): Location!
`;
