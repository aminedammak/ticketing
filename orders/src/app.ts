import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@dmk_tickets/common";

import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes/index";
import { deleteOrderRouter } from "./routes/delete";

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

app.use(currentUser);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
