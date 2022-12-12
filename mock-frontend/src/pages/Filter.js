import React, { useState, useEffect } from 'react';
import { Accordion, Form, Segment } from 'semantic-ui-react';
import { getBuildings, getCampuses } from '../requests';

const Filter = () => {
  const [buildingFilterList, setBuildingFilter] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [state, setState] = useState({ activeIndex: 4 });

  useEffect(() => {
    getBuildings().then((res) => setBuildings(res));
  }, []);

  useEffect(() => {
    getCampuses().then((res) => setCampuses(res));
  }, []);

  function toggleBuildingFilter(el, name) {
    el.blur();
    el.classList.toggle('filter-selected');

    if (buildingFilterList.includes(name.toLowerCase())) {
      const index = buildingFilterList.indexOf(name.toLowerCase());
      if (index > -1) {
        buildingFilterList.splice(index, 1);
      }
    } else {
      buildingFilterList.push(name.toLowerCase());
    }

    setBuildingFilter(buildingFilterList);
    filterRoomsByBuilding();
  }

  function filterRoomsByBuilding() {
    const cardList = document.querySelectorAll('div[data-building]');
    for (const card of cardList) {
      card.parentElement.classList.remove('hidden');
    }

    if (buildingFilterList.length === 0) {
      return;
    }

    for (const card of cardList) {
      const building = card.getAttribute('data-building').toLowerCase();
      if (!buildingFilterList.includes(building)) {
        card.parentElement.classList.add('hidden');
      }
    }
  }
  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = state;
    const newIndex = activeIndex === index ? -1 : index;

    setState({ activeIndex: newIndex });
  }

  //const buttonClass = 'ui filter mb-2 mx-2';
  const { activeIndex } = state;

  return (
    <div className="filter-component ">
      <Segment inverted style={{ overflow: 'auto', maxHeight: 200 }}>
        <div className="ui horizontal accordion menu inverted">
          {campuses.map((campus, index) => (
            <div className="item" key={campus.name}>
              <Accordion.Title
                active={activeIndex === index}
                content={campus.name}
                index={index}
                onClick={handleClick}
              />
              {campus.buildings.map((building) => (
                <Accordion.Content key={building.name} active={activeIndex === index}>
                  <Form inverted>
                    <Form.Checkbox
                      label={building.name}
                      onClick={(el) => toggleBuildingFilter(el.target, building.name)}
                    ></Form.Checkbox>
                  </Form>
                </Accordion.Content>
              ))}
            </div>
          ))}
        </div>
      </Segment>
    </div>
  );
};

export default Filter;
