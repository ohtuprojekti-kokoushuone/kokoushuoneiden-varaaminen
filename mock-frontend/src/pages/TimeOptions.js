import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ChooseTime = () => {
  const { t } = useTranslation();
  const mins = ['15', '30', '45', '60', '90', '120'];
  return (
    <div className="container text-center">
      <h4>{t('chooseDuration')}</h4>
      <div className="d-grid gap-3 col-8 mx-auto">
        {mins.map((i) => (
          <Link to="/reservations" className="btn btn-primary btn-lg" key={i}>
            {i} {t('unit.minutes')}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChooseTime;
