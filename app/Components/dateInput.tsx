
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface DateInputProps {
  onDateChange: (date: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date as Date);
  };

  return (
    
    <div className="flex relative items-center my-2 space-x-2 ">
    
      <div className='  -mr-10 -ml-2 '>
       <div className="absolute z-50 w-screen ">
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          autoComplete="off"
          className="border py-3 ml-2 w-50 border-green-500 bg-white dark:bg-[#011E2B] rounded-md relative text-opacity-0 select-none dark:text-white"
        />
       </div>
     </div>
    </div>
  );
};

export default DateInput;
