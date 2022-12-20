import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton
} from 'react-accessible-accordion';
import { useTranslation } from 'react-i18next';
import { getCampuses } from '../requests';

const Filter = () => {
  const { t } = useTranslation();
  const [buildingFilterList, setBuildingFilter] = useState([]);
  const [campuses, setCampuses] = useState([]);

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

  const [isChecked, setIsChecked] = useState(false);

  return (
    <Accordion allowZeroExpanded aria-label={t('chooseCampus')}>
      <div className="ui horizontal accordion menu inverted" style={{ overflow: 'auto', maxHeight: 200 }}>
        {campuses.map((campus) => (
          <div className="item" key={campus.name}>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>{t(campus.name)}</AccordionItemButton>
              </AccordionItemHeading>
              {campus.buildings.map((building) => (
                <AccordionItemPanel key={building.name}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => {
                        setIsChecked(!isChecked);
                      }}
                      onClick={(el) => toggleBuildingFilter(el.target, building.name)}
                    />
                    <span className={`checkbox ${isChecked ? 'checkbox--active' : ''}`} aria-hidden="true" />
                    {t(building.name.replaceAll(' ', ''))}
                  </label>
                </AccordionItemPanel>
              ))}
            </AccordionItem>
          </div>
        ))}
      </div>
    </Accordion>
  );
};

export default Filter;
