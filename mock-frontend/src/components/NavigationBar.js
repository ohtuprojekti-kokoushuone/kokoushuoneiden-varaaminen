import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import logo from '../hy-logo-white.png';
import reservator from '../reservator.png';
import { confirmAlert } from 'react-confirm-alert';
import { basePath } from '../config';

const NavigationBar = () => {
  const handleChangeLanguage = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="react-confirm-alert-body" style={{ width: '260px' }}>
            <div>
              <button
                className="ui button"
                color="white"
                style={{ width: '200px' }}
                autoFocus
                onClick={() => {
                  i18next.changeLanguage('fi');
                  onClose();
                }}
              >
                Suomi (FI)
              </button>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              <button
                className="ui button"
                color="white"
                style={{ width: '200px' }}
                autoFocus
                onClick={() => {
                  i18next.changeLanguage('en');
                  onClose();
                }}
              >
                English (EN)
              </button>
            </div>
          </div>
        );
      }
    });
  };
  const { t } = useTranslation();

  return (
    <div className="ui grid">
      <div className="tablet mobile only row">
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
            <Dropdown item icon="bars">
              <Dropdown.Menu>
                <Menu.Item href={`${basePath}/reservations`}>{t('label.reservations')}</Menu.Item>
                <Menu.Item href={`${basePath}/choosetime`}>{t('label.chooseTime')}</Menu.Item>
                <Menu.Item href={'Shibboleth.sso/Logout'}>{t('button.logout')}</Menu.Item>
                <Menu.Item>
                  <button className="ui labeled icon button" color="transparent" onClick={() => handleChangeLanguage()}>
                    <i className="world icon"></i>
                    {t('label.activeLanguage')}
                  </button>
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
            <Menu.Item href={'Shibboleth.sso/Logout'}>{t('button.logout')}</Menu.Item>
          </Menu.Menu>

          <Menu.Menu>
            <button className="ui labeled icon button" color="black" onClick={() => handleChangeLanguage()}>
              <i className="world icon"></i>
              {t('label.activeLanguage')}
            </button>
          </Menu.Menu>
        </Menu>
      </div>
    </div>
  );
};

export default NavigationBar;
