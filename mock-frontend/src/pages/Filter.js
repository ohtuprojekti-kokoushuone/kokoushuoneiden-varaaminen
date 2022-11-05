import React, { useState } from 'react';
//import Button from 'react-bootstrap/Button';
import { Button } from 'semantic-ui-react';

const Filter = () => {
  const [filterList, setFilter] = useState([]);

  function toggleFilter(el, name) {
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
    const cardList = document.querySelectorAll('div[data-name]');
    for (const card of cardList) {
      card.classList.remove('hidden');
    }

    if (filterList.length === 0) {
      return;
    }

    for (const card of cardList) {
      if (!filterList.includes(card.getAttribute('data-name').toLowerCase())) {
        card.classList.add('hidden');
      }
    }
  }

  const buttonClass = 'filter fw-bold mb-2 mx-2';

  return (
    <div>
      <Button color="black" className={buttonClass} onClick={(el) => toggleFilter(el.target, 'testirakennus')}>
        Testirakennus
      </Button>
      <Button color="black" className={buttonClass} onClick={(el) => toggleFilter(el.target, 'Exactum')}>
        Exactum
      </Button>
      <Button color="black" className={buttonClass} onClick={(el) => toggleFilter(el.target, 'Physicum')}>
        Physicum
      </Button>
      <Button color="black" className={buttonClass} onClick={(el) => toggleFilter(el.target, 'Chemicum')}>
        Chemicum
      </Button>
    </div>
  );
};

export default Filter;
