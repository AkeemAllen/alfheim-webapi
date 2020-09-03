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
      amenities: input.amenities,
      rules: input.rules,
      personalID: input.personalID,
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
  updateRoom: async ({ input, id }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
    const room = await Room.findById(id);
    if (!room) {
      throw new Error("Room Not Found");
    }

    try {
      input.occupancy !== undefined ? (room.occupancy = input.occupancy) : null;
      input.gender !== undefined ? (room.gender = input.gender) : null;
      input.price !== undefined ? (room.price = input.price) : null;
      input.street !== undefined ? (room.street = input.street) : null;
      input.town_city !== undefined ? (room.town_city = input.town_city) : null;
      input.parish !== undefined ? (room.parish = input.parish) : null;
      input.isAvailable !== undefined
        ? (room.isAvailable = input.isAvailable)
        : null;
      input.isVisible !== undefined ? (room.isVisible = input.isVisible) : null;
      input.personalID !== undefined
        ? (room.personalID = input.personalID)
        : null;
      input.rules !== undefined ? (room.rules = input.rules) : null;
      input.image !== undefined ? (room.image = input.image) : null;

      return room.save();
    } catch (error) {
      throw new Error(error);
    }
  },
  updateAvailability: async ({ id, currentAvailability }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
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
  updateVisibility: async ({ id, currentVisibility }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
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
    return await Room.findById(id).populate("owner");
  },
  getRoomByOwner: async ({ ownerId }, req) => {
    const rooms = await Room.find({ owner: ownerId }).populate("owner");
    return rooms;
  },
  addRule: async ({ id, rule }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
    const room = await Room.findById(id);
    room.rules.push(rule);
    room.save().then((result) => {
      return result;
    });
  },
  addAmenity: async ({ id, amenity }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
    const room = await Room.findById(id);
    room.amenities.push(amenity);
    room.save().then((result) => {
      return result;
    });
  },
  deleteRoom: async ({ id }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
    const room = await Room.findByIdAndDelete(id);
    room.save().then((result) => {
      return result;
    });
  },
  deleteSingleRule: async ({ id, ruleToDelete }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
    const room = await Room.findById(id);
    console.log(ruleToDelete);
    room.rules = room.rules.filter((rule) => rule !== ruleToDelete);

    room.save().then((result) => {
      console.log(result);
      return result;
    });
  },
  deleteSingleAmenity: async ({ id, amenityToDelete }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
    const room = await Room.findById(id);
    room.amenities = room.amenities.filter(
      (amenity) => amenity !== amenityToDelete
    );
    room.save().then((result) => {
      return result;
    });
  },
};
