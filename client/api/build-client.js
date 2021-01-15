import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    //We are on the server
    //Create a new instance of axios
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/",
      headers: req.headers,
    });
  } else {
    //We should be on the browser
    return axios.create({
      baseURL: "/" /* We can even omit this */,
    });
  }
};
