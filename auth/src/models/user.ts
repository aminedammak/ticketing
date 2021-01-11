import mongoose from "mongoose";
import { Password } from "../services/password";
//An interface that describes the properties that are
//required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

//An interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  //if mongoose add extra properties like createAt, we put them here
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//we use normal function so that "this" refers to the document being saved,
//if we use arrow function then "this" will refers to the context of the current file
userSchema.pre("save", async function (done) {
  //we hash the password only if it's value has been changed
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
    //in mongoose we need to call "done" after async operation
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
