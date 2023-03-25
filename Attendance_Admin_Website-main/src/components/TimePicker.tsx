import React, { useState } from "react";
import TimePicker from 'react-time-picker';

export default function TimePickerComponent({ title = "", onChange = () => { },format='d/MM/Y',value=new Date(), disableCalendar=false,}) {

  return (
    <div style={{}}>
      <text style={{marginRight:5}}>{title}</text>
      <TimePicker
        onChange={onChange}
        value={value}
      /> 
    </div>
  );
}
