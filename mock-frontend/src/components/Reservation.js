import React from "react";

const Reservation = ({ res }) => {
  return (
    <tr>
      <td>{res.subject}</td>
      <td>{res.start.dateTime}</td>
      <td>{res.end.dateTime}</td>
    </tr>
  );
};

export default Reservation;