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

exports.useMorgan = (app) => {
  app.use(morgan("dev"));
};

exports.mongoConnection = () => {
  mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once("open", () => {
    console.log("conneted to database");
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
