const Room = require("../../models/Room");
const User = require("../../models/User");

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
  updateAvailability: async ({ id, currentAvailability }) => {
    const room = await Room.findById(id);
    if (!room) {
      throw new Error("Room Not Found");
    }
    try {
      room.isAvailable = !currentAvailability;
      return room.save();
    } catch (error) {
      throw new Error("Could not be updated");
    }
  },
  updateVisibility: async ({ id, currentVisibility }) => {
    const room = await Room.findById(id);
    if (!room) {
      throw new Error("Room Not Found");
    }
    try {
      room.isVisible = !currentVisibility;
      return room.save();
    } catch (error) {
      throw new Error("Could not be updated");
    }
  },
  allRooms: async () => {
    return await Room.find().populate("owner").populate("location");
  },
  getRoomById: async ({ id }, req) => {
    return await Room.findById(id).populate("owner").populate("location");
  },
};
