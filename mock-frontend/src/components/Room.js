import React from "react";

const Room = ({ room, toggleReserved }) => {
  const label = room.available ? "varaa" : "varattu";

  return (
    <tr key={room.id}>
      <td>{room.id}</td>
      <td>{room.size}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={toggleReserved}
        >
          {label}
        </button>
      </td>
    </tr>
  );
};

export default Room;
