import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ChooseTime = () => {
  const { t } = useTranslation();
  return (
    <div className="container text-center">
      <h4>{t('chooseDuration')}</h4>
      <div className="d-grid gap-3 col-8 mx-auto">
        <Link to="/reservations" className="btn btn-primary btn-lg">
          15 min
        </Link>
        <Link to="/reservations" className="btn btn-primary btn-lg">
          30 min
        </Link>
        <Link to="/reservations" className="btn btn-primary btn-lg">
          45 min
        </Link>
        <Link to="/reservations" className="btn btn-primary btn-lg">
          60 min
        </Link>
        <Link to="/reservations" className="btn btn-primary btn-lg">
          90 min
        </Link>
        <Link to="/reservations" className="btn btn-primary btn-lg">
          120 min
        </Link>
      </div>
    </div>
  );
};

export default ChooseTime;
