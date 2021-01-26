import { response } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

jest.mock("../nats-wrapper");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "sdfqsfdqsdf";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  /* Delete all data */
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //Build a JWT payload: {id, email}
  // const payload = {
  //   id: "54sd4f5sfs",
  //   email: "test@test.com",
  // };

  //Here we generate the id dynamically so that each time this function is invoked we
  // have a different signed user
  // if we want to sign in with the same user we need to save the cookie generated for the first call
  // and used it
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  //Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build session object {jwt: MY_JWT}
  const session = { jwt: token };

  //Turn that session into json
  const sessionJSON = JSON.stringify(session);

  //Take that json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  //return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
