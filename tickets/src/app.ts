import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

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

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
