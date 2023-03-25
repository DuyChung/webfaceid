import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';

export default function DatetiemPicker({ title = "", onChange = () => { },format='d/MM/y',value=new Date(), disableCalendar=false,}) {

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <text style={{marginBottom:5}}>{title}</text>
      <DateTimePicker
        onChange={onChange}
        value={value}
        format={format}
        disableCalendar={true}
      />
    </div>
  );
}
