import axios from "axios";

export function getTest() {
  const req = axios.get("http://localhost:3003/testData");
  return req.then((res) => res.data);
}
