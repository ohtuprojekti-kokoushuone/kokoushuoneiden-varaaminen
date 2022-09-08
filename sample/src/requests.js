import axios from "axios";

export function getTest() {
  axios
    .get("http://localhost:3003/testData")
    .then((res) => console.log(res.data));
}
