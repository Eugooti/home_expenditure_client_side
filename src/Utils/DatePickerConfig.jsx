import { useField } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DatePickerWrapper = ({ name, label, ...otherProps }) => {
    const [field, meta, helpers] = useField(name);
    const { value } = field;
    const { setValue, setTouched } = helpers;

    const handleChange = (date) => {
        const formattedDate = dayjs(date).format('YYYY/MM/DD');
        setValue(formattedDate);
    };

    const handleBlur = () => {
        setTouched(true);
    };

    const configDatePicker = {
        ...field,
        ...otherProps,
        value: value || null,
        onChange: handleChange,
        onBlur: handleBlur,
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker label={label} {...configDatePicker} />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default DatePickerWrapper;
