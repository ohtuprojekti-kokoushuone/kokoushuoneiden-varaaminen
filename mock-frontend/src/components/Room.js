import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'semantic-ui-react';

const Room = ({ room }) => {
  const { t } = useTranslation();
  return (
    <Container text>
      <h3>{room.name}</h3>
      <p>
        {t('label.building')} {room.building}
      </p>
      <p>
        {t('label.size')} {room.size} {t('unit.people')}
      </p>
      <p>
        {t('label.maxtime')} {room.maxTime + ' min'}
      </p>
      <p>
        {t('label.usergroup')} {room.groups}
      </p>
    </Container>
  );
};

export default Room;
