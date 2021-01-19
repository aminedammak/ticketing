import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@dmk_tickets/common";

const app = express();
app.set(
  "trust proxy",
  true
); /* To make sure that express is aware the it's behind a proxy of Ingress-nginx */
app.use(json());
app.use(
  cookieSession({
    signed: false /* Disable encryption since JWT will be already encrypted*/,
    secure: process.env.NODE_ENV !== "development",
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

export { app };
