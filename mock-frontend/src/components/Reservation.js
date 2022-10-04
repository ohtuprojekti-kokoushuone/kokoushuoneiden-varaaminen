import React from "react";

const Reservation = ({ res }) => {
  let start = new Date(res.start.dateTime);
  let end = new Date(res.end.dateTime);
  
  return (
    <tr>
      <td>{res.subject}</td>
      <td>{start.toLocaleString("fi-FI")}</td>
      <td>{end.toLocaleString("fi-FI")}</td>
    </tr>
  );
};

export default Reservation;