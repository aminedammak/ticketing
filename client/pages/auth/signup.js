export default () => {
  return (
    <form>
      <h1>sign up</h1>
      <div className="form-group">
        <label>Email address</label>
        <input className="form-control" />
      </div>
      <div className="form-group">
        <label>Passowrd</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    </form>
  );
};
