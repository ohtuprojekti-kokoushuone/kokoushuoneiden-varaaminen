import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { getBuildings } from '../requests';

const Filter = () => {
  const [filterList, setFilter] = useState([]);
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getBuildings().then((res) => setBuildings(res));
  }, []);

  function toggleFilter(el, name) {
    el.blur();
    el.classList.toggle('filter-selected');

    if (filterList.includes(name.toLowerCase())) {
      const index = filterList.indexOf(name.toLowerCase());
      if (index > -1) {
        filterList.splice(index, 1);
      }
    } else {
      filterList.push(name.toLowerCase());
    }

    setFilter(filterList);
    filterRooms();
  }

  function filterRooms() {
    const cardList = document.querySelectorAll('div[data-building]');
    for (const card of cardList) {
      card.parentElement.classList.remove('hidden');
    }

    if (filterList.length === 0) {
      return;
    }

    for (const card of cardList) {
      const building = card.getAttribute('data-building').toLowerCase();
      if (!filterList.includes(building)) {
        card.parentElement.classList.add('hidden');
      }
    }
  }

  const buttonClass = 'filter fw-bold mb-2 mx-2';

  return (
    <div>
      {buildings.map((building) => (
        <Button
          key={building.name}
          variant="dark"
          className={buttonClass}
          onClick={(el) => toggleFilter(el.target, building.name)}
        >
          {building.name}
        </Button>
      ))}
    </div>
  );
};

export default Filter;
