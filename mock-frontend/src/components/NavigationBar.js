import React from 'react';
import { Icon, Menu, Dropdown, Button } from 'semantic-ui-react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import logo from '../hy-logo-white.png';
import reservator from '../reservator.png';
import { basePath, logoutPath } from '../config';

const NavigationBar = () => {
  const { t } = useTranslation();

  const handleLogout = () => {
    window.location.href = logoutPath;
  };

  return (
    <div className="ui grid">
      <div className="tablet mobile only row">
        <Menu inverted fixed="top">
          <Menu.Item href={`${basePath}/home`}>
            <div className="Item">
              <img alt="HY Logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
            </div>
            <div className="Item">
              <img alt="RESERVATOR" src={reservator} height="30" className="d-inline-block align-top" />
            </div>
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown item icon="bars">
              <Dropdown.Menu>
                <Menu.Item href={`${basePath}/reservations`}>{t('label.reservations')}</Menu.Item>
                <Menu.Item href={`${basePath}/choosetime`}>{t('label.chooseTime')}</Menu.Item>
                <Menu.Item onClick={handleLogout}>{t('button.logout')}</Menu.Item>
                <Menu.Item
                  onClick={() => {
                    i18next.changeLanguage('en');
                  }}
                >
                  <Icon name="world" />
                  English (EN)
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    i18next.changeLanguage('fi');
                  }}
                >
                  <Icon name="world" />
                  Suomi (FI)
                </Menu.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
      <div className="computer only row">
        <Menu inverted fixed="top">
          <Menu.Item href={`${basePath}/home`}>
            <div className="Item">
              <img alt="HY Logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="Item">
              <img alt="RESERVATOR" src={reservator} height="30" className="d-inline-block align-top" />
            </div>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item href={`${basePath}/reservations`}>{t('label.reservations')}</Menu.Item>
            <Menu.Item href={`${basePath}/choosetime`}>{t('label.chooseTime')}</Menu.Item>
            <Menu.Item onClick={handleLogout}>{t('button.logout')}</Menu.Item>
            <Menu.Item>
              <div className="ui buttons">
                <Button
                  className="ui inverted basic labeled icon button"
                  aria-label="Change language to English"
                  onClick={() => {
                    i18next.changeLanguage('en');
                  }}
                >
                  <i className="world icon"></i>
                  English (EN)
                </Button>
                <Button
                  className="ui inverted basic labeled icon button"
                  aria-label="Vaihda kieleksi suomi"
                  onClick={() => {
                    i18next.changeLanguage('fi');
                  }}
                >
                  <i className="world icon"></i>
                  Suomi (FI)
                </Button>
              </div>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    </div>
  );
};
export default NavigationBar;
