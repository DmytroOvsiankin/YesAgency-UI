import DatePicker from 'react-native-date-picker';

import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Selector from './Selector';
import CalendarIcon from '@assets/input/calendar.svg';
import moment from 'moment';

type SelectorProps = {
  label: string;
  placeholder: string;
  selectedDate: string;
  containerStyle?: StyleProp<ViewStyle>;
  changeDate: (date: string) => void;
};

const DatePickerSelector: React.FC<SelectorProps> = ({
  label,
  placeholder,
  selectedDate,
  containerStyle,
  changeDate,
}) => {
  const maxDate = new Date(moment(new Date()).subtract(15, 'years').format('YYYY-MM-DD'));
  const minDate = new Date(moment(new Date()).subtract(65, 'years').format('YYYY-MM-DD'));

  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Selector
        label={label}
        value={selectedDate}
        placeholder={placeholder}
        containerStyle={containerStyle}
        onPress={() => {
          setOpen(true);
        }}
        leftAccessory={
          <View style={styles.calendarIcon}>
            <CalendarIcon />
          </View>
        }
      />

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        minimumDate={minDate}
        maximumDate={maxDate}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          changeDate(moment(date).format('DD-MM-YYYY'));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DatePickerSelector;

const styles = StyleSheet.create({
  calendarIcon: {},
});
