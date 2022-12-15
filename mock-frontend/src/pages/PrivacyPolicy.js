import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HiExternalLink } from 'react-icons/hi';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="privacy-policy">
      <h2>{t('privacyPolicy.title')}</h2>
      <Accordion defaultActiveKey={null} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h4>{t('privacyPolicy.label.contactInfo')}</h4>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              <b>Niko Mäkitalo</b>
            </p>
            <p>
              {t('HY')}
              <br />
              {t('POBox')} 68 (Pietari Kalmin katu 5)
              <br />
              FI-00014 Helsinki, {t('finland')}
              <br />
              {t('tel')} <a href="tel:+358503114943">+358 50 311 4943</a>
              <br />
              <a href="mailto:niko.makitalo@helsinki.fi">niko.makitalo@helsinki.fi</a>
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h4>{t('privacyPolicy.label.data')}</h4>
          </Accordion.Header>
          <Accordion.Body>
            <p>{t('privacyPolicy.content.data')}</p>
            <ul>
              <li>{t('name')}</li>
              <li>{t('email')}</li>
              <li>{t('username')}</li>
              <li>{t('employeenumber')}</li>
              <li>{t('groups')}</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <h4>{t('privacyPolicy.label.purpose')}</h4>
          </Accordion.Header>
          <Accordion.Body>{t('privacyPolicy.content.purpose')}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <h4>{t('privacyPolicy.label.disclosure')}</h4>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              {t('privacyPolicy.content.disclosure')}
              <a target="_blank" href="https://www.mongodb.com/legal/privacy-policy" rel="noreferrer">
                MongoDB
                <HiExternalLink size={15} />
              </a>
              {t('privacyPolicy.content.disclosure2')}
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <h4>{t('privacyPolicy.label.storage')}</h4>
          </Accordion.Header>
          <Accordion.Body>{t('privacyPolicy.content.storage')}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default PrivacyPolicy;
