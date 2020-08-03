const Room = require("../../models/Room");
const User = require("../../models/User");
const Location = require("../../models/Location");

module.exports = {
  createRoom: async ({ input }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }

    const room = new Room({
      occupancy: input.occupancy,
      gender: input.gender,
      price: input.price,
      street: input.street,
      town_city: input.town_city,
      parish: input.parish,
      owner: req.userId,
    });
    let createdRoom;
    return await room
      .save()
      .then((result) => {
        createdRoom = { ...result._doc, id: result._id };
        return User.findById(req.userId);
      })
      .then((user) => {
        if (!user) {
          throw new Error("User non-existent");
        }
        user.roomsOwned.push(room);
        return user.save();
      })
      .then(() => {
        return createdRoom;
      });
  },
  allRooms: async () => {
    return await Room.find().populate("owner").populate("location");
  },
  getRoomById: async ({ id }, req) => {
    return await Room.findById(id).populate("owner").populate("location");
  },
};
