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
  updateRoom: async ({ input, id }) => {
    const room = await Room.findById(id);
    if (!room) {
      throw new Error("Room Not Found");
    }

    try {
      (input.occupancy !== null) | undefined | ""
        ? (room.occupancy = input.occupancy)
        : null;
      (input.gender !== null) | undefined | ""
        ? (room.gender = input.gender)
        : null;
      (input.price !== null) | undefined | ""
        ? (room.price = input.price)
        : null;
      (input.street !== null) | undefined | ""
        ? (room.street = input.street)
        : null;
      (input.town_city !== null) | undefined | ""
        ? (room.town_city = input.town_city)
        : null;
      (input.parish !== null) | undefined | ""
        ? (room.parish = input.parish)
        : null;

      return room.save();
    } catch (error) {
      throw new Error(error);
    }
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
