import axios from "axios";
const URL = "http://localhost:4000/api/login/token/";

export function DoLogin(loginData) {
  return new Promise((resolve) =>
    axios.post(URL, loginData)
    .then((res) => resolve({ data: res.data }))
    .catch(error => {
      resolve({ data: error.response.status })
    })
  );
}
