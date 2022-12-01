import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';

registerLocale('fi', fi);

const ReservatorDatePicker = ({ selected, onChange, dateTestId, t, i18n }) => (
  <DatePicker
    dateFormat="dd.MM.yyyy HH:mm"
    selected={selected}
    onChange={(date) => onChange(date)}
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    timeCaption={t('label.time')}
    locale={i18n.language}
    customInput={<input data-testid={dateTestId} type="text" />}
  />
);

export default ReservatorDatePicker;
