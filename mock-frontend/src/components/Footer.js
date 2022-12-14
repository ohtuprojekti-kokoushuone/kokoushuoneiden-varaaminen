import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../hy-logo-white.png';
import { HiExternalLink } from 'react-icons/hi';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <div className="copyright">
        <p>Copyright © 2022 Niko Mäkitalo & Ohtuprojekti 22</p>
      </div>
      <div className="logo">
        <img alt="" src={logo} width="30" height="30" aria-hidden={true} />
      </div>
      <div className="links">
        <a href="/privacyPolicy" target="_blank">
          {t('label.privacyPolicy')}
          <HiExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
