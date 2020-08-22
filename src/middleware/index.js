const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const graphqlSchema = require("../graphql/schema");
const graphqlResolver = require("../graphql/resolvers");
const isAuth = require("./is-auth");
const verify = require("./userVerification");
const userVerificaiton = require("../rest routes/verification");
const router = require("express").Router();
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
let gfs;

exports.useMorgan = (app) => {
  app.use(morgan("dev"));
};

exports.useFileUpload = (uri) => {
  const storage = new GridFsStorage({
    url: uri,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads",
          };
          resolve(fileInfo);
        });
      });
    },
  });
  const upload = multer({ storage });
  return upload;
};

exports.mongoConnection = () => {
  mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;

  connection.once("open", () => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection("uploads");

    console.log("conneted to database");
  });
};

exports.imageUpload = (app) => {
  const upload = this.useFileUpload(process.env.MONGO_DB);

  app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ file: req.file });
  });

  // Get All Image Files
  app.get("/files", (req, res) => {
    gfs.files.find().toArray((err, files) => {
      if (err) throw err;

      if (!files || files.length === 0) {
        return res.status(404).json({ err: "No files exist" });
      }

      return res.json(files);
    });
  });

  // Get A Single Image File Info
  app.get("/files/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (err) throw err;

      if (!file || file.length === 0) {
        return res.status(404).json({ err: "File does not exist" });
      }

      return res.json(file);
    });
  });

  // View the retrieved Image
  app.get("/image/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (err) throw err;
      if (!file || file.length === 0) {
        return res.status(404).json({ err: "File does not exist" });
      }

      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an Image",
        });
      }
    });
  });
};

exports.setHeaders = (app) => {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
};

exports.useCors = (app) => {
  app.use(cors());
};

exports.useBodyParser = (app) => {
  app.use(bodyParser.json());
};

exports.verification = (app) => {
  app.use("/confirmation", verify);
};

exports.setUpGraphql = (app) => {
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,
      pretty: true,
      customformatError(err) {
        if (!err.originalError) {
          return err;
        }
        const data = err.originalError.data;
        const message = err.message || "An error occured";
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data };
      },
    })
  );
};

exports.authentication = (app) => {
  app.use(isAuth);
};
