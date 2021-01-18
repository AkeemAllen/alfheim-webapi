const Room = require("../../models/Room");
const User = require("../../models/G_User");
const DateConverter = require("dateconverter");

module.exports = {
  createRoom: async ({ input }, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthorized");
    // }

    const user = await User.findOne({ uuid: input.uuid });
    if (!user) {
      throw new Error("User Not Found");
    }

    const splitDate = input.expirationDate.split("/");
    const expiry = new Date(`${splitDate[2]} ${splitDate[0]} ${splitDate[1]}`);
    const room = new Room({
      price: input.price,
      location: input.location,
      owner: user,
      description: input.description,
      expirationDate: expiry.toISOString(),
      contact: input.contact,
    });

    room.createdAt.expires = room.expirationDate;

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
      input.location !== undefined ? (room.location = input.location) : null;
      input.isAvailable !== undefined
        ? (room.isAvailable = input.isAvailable)
        : null;
      input.isVisible !== undefined ? (room.isVisible = input.isVisible) : null;
      input.description !== undefined
        ? (room.description = input.description)
        : null;
      input.image !== undefined ? (room.image = input.image) : null;
      input.contact !== undefined ? (room.contact = input.contact) : null;
      input.expirationDate !== undefined
        ? (room.expirationDate = input.expirationDate)
        : null;

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
  deleteRoom: async ({ id }, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthorized");
    // }
    const room = await Room.findByIdAndDelete(id);
    room.save().then((result) => {
      return result;
    });
  },
};
