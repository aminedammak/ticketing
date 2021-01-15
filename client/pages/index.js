import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log("currentuser", currentUser);

  return <h1>Landing page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    //We are on a server
    //Requests should be made to http://<ingress-nginx_service_name>.<ingress-nginx_namespace>.svc.cluster.local/...
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    //We are on the client!
    //Requests can be made with base url of ""
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
  return {};
};

export default LandingPage;
