const Room = require("../../models/Room");
const User = require("../../models/User");

module.exports = {
  createRoom: async ({ input }, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthorized");
    // }
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User non-existent");
    }
    const room = new Room({
      price: input.price,
      street: input.street,
      town_city: input.town_city,
      parish: input.parish,
      owner: req.userId,
      personalID: input.personalID,
      description: input.description,
    });

    let createdRoom;

    return await room
      .save()
      .then((result) => {
        createdRoom = { ...result._doc, id: result._id };
        user.roomsOwned.push(room);
        return user.save();
      })
      .then(() => {
        return createdRoom;
      });
  },
  updateRoom: async ({ input, id }, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthorized");
    // }
    const room = await Room.findById(id);
    if (!room) {
      throw new Error("Room Not Found");
    }

    try {
      input.price !== undefined ? (room.price = input.price) : null;
      input.street !== undefined ? (room.street = input.street) : null;
      input.town_city !== undefined ? (room.town_city = input.town_city) : null;
      input.parish !== undefined ? (room.parish = input.parish) : null;
      input.description !== undefined
        ? (room.description = input.description)
        : null;
      input.isAvailable !== undefined
        ? (room.isAvailable = input.isAvailable)
        : null;
      input.personalID !== undefined
        ? (room.personalID = input.personalID)
        : null;
      input.image !== undefined ? (room.image = input.image) : null;

      return room.save();
    } catch (error) {
      throw new Error(error);
    }
  },
  updateAvailability: async ({ id, currentAvailability }, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthorized");
    // }
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
  allRooms: async () => {
    return await Room.find().populate("owner");
  },
  getRoomById: async ({ id }, req) => {
    return await Room.findById(id).populate("owner");
  },
  getRoomByOwner: async ({ ownerId }, req) => {
    const owner = await User.findOne({ uuid: ownerId });
    const rooms = await Room.find({ owner: owner }).populate("owner");
    return rooms;
  },
  deleteRoom: async ({ id }) => {
    const room = await Room.findByIdAndDelete(id);
    room.save().then((result) => {
      return result;
    });
  },
};
