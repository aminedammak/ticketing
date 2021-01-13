import { useState } from "react";
import axios from "axios";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("/api/users/signup", {
      email,
      password,
    });
    console.log("response", response.data);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>sign up</h1>
      <div className="form-group">
        <label>Email address</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Passowrd</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    </form>
  );
};
