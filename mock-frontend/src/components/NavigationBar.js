import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import logo from '../hy-logo-white.png';

const NavigationBar = ({ user }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedReservationsAppUser');
  };
  const { t } = useTranslation();

  return (
    <Menu inverted fixed="top">
      <Menu.Item href="/home">
        <img alt="HY Logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
      </Menu.Item>
      {user === null ? null : (
        <Menu.Menu>
          <Menu.Item href="/reservations">{t('label.reservations')}</Menu.Item>
          <Menu.Item href="/choosetime">{t('label.chooseTime')}</Menu.Item>
          <Menu.Item href="/" onClick={handleLogout}>
            {t('button.logout')}
          </Menu.Item>
        </Menu.Menu>
      )}
      <Menu.Menu position="right">
        <Dropdown item text={t('label.language')}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => i18next.changeLanguage('fi')} active={i18next.language === 'fi'}>
              FI
            </Dropdown.Item>
            <Dropdown.Item onClick={() => i18next.changeLanguage('en')} active={i18next.language === 'en'}>
              EN
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default NavigationBar;
