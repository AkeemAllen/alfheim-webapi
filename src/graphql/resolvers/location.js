const Location = require("../../models/Location");
const Room = require("../../models/Room");

module.exports = {
  addLocation: async ({ input }) => {
    const location = new Location({
      street: input.street,
      town_city: input.town_city,
      parish: input.parish,
      room: input.room,
    });
    let createdLocation;
    return await location
      .save()
      .then((result) => {
        createdLocation = { ...result._doc, id: result._id };
        return Room.findById(input.room);
      })
      .then((room) => {
        if (!room) {
          throw new Error("Room was not found");
        }
        room.location = location;
        return room.save();
      })
      .then(() => {
        return createdLocation;
      });
  },
  allLocations: async () => {
    return await Location.find().populate("room");
  },
};
