import React from 'react';
import { Menu, Responsive, Dropdown, DropdownMenu } from 'semantic-ui-react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import logo from '../hy-logo-white.png';
import { confirmAlert } from 'react-confirm-alert';

const NavigationBar = ({ user }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedReservationsAppUser');
  };

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
          <Menu.Item href="/home">
            <img alt="HY Logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Kokoushuonevaraus
          </Menu.Item>
          {user === null ? null : (
            <Menu.Menu position="right">
              <Dropdown item icon="bars">
                <Dropdown.Menu>
                  <Menu.Item href="/reservations">{t('label.reservations')}</Menu.Item>
                  <Menu.Item href="/choosetime">{t('label.chooseTime')}</Menu.Item>
                  <Menu.Item href="/" onClick={handleLogout}>
                    {t('button.logout')}
                  </Menu.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          )}
          <Menu.Menu>
            <button className="ui labeled icon button" color="transparent" onClick={() => handleChangeLanguage()} icon>
              <i className="world icon"></i>
              {t('label.activeLanguage')}
            </button>
          </Menu.Menu>
        </Menu>
      </div>
      <div className="computer large screen only row">
        <Menu inverted fixed="top">
          <Menu.Item href="/home">
            <img alt="HY Logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Kokoushuonevaraus
          </Menu.Item>
          {user === null ? null : (
            <Menu.Menu position="right">
              <Menu.Item href="/reservations">{t('label.reservations')}</Menu.Item>
              <Menu.Item href="/choosetime">{t('label.chooseTime')}</Menu.Item>
              <Menu.Item href="/" onClick={handleLogout}>
                {t('button.logout')}
              </Menu.Item>
            </Menu.Menu>
          )}
          <Menu.Menu>
            <button className="ui labeled icon button" color="black" onClick={() => handleChangeLanguage()} icon>
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
