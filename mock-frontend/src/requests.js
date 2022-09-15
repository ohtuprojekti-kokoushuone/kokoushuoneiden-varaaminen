import axios from "axios";

export function getRooms() {
  const req = axios.get("http://localhost:3003/rooms");
  return req.then((res) => res.data);
}
