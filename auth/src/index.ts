import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set(
  "trust proxy",
  true
); /* To make sure that express is aware the it's behind a proxy of Ingress-nginx */
app.use(json());
app.use(
  cookieSession({
    signed: false /* Disable encryption since JWT will be already encrypted*/,
    secure: true /* Allow cookies only for https connection */,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      /* Those options are needed to avoid some eventual errors and warnings */
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connecting to DB");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
