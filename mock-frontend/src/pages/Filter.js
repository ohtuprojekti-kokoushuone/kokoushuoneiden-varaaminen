import React, { useState, useEffect } from 'react';
import { Accordion, Form, Segment } from 'semantic-ui-react';
import { getCampuses } from '../requests';

const Filter = () => {
  const [buildingFilterList, setBuildingFilter] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getCampuses().then((res) => setCampuses(res));
  }, []);

  function toggleBuildingFilter(el, name) {
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
    const { activeIndex } = activeTab;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveTab({ activeIndex: newIndex });
  }

  const { activeIndex } = activeTab;

  return (
    <div className="filter-component ">
      <Segment inverted style={{ overflow: 'auto', maxHeight: 200 }}>
        <div className="ui horizontal accordion menu inverted">
          {campuses.map((campus, index) => (
            <div className="item" key={campus.name}>
              <Accordion.Title
                active={activeIndex === index + 1}
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
