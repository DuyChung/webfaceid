import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useLocation, useHistory } from "react-router-dom";
import InputField from "../components/InputField";
import Button from '../components/button'
import TimePicker from '../components/TimePicker'

const ChiTietCalam = () => {
  const { state } = useLocation();
  const history = useHistory()


  const day_data = [
    { id: "Monday", name: "Thứ 2" },
    { id: "Tuesday", name: "Thứ 3" },
    { id: "Wednesday", name: "Thứ 4" },
    { id: "Thursday", name: "Thứ 5" },
    { id: "Friday", name: "Thứ 6" },
    { id: "Saturday", name: "Thứ 7" },
    { id: "Sunday", name: "Chủ nhật" },
  ];
  const [shiftsName, setshiftsName] = useState(state.data.name);
  const [working_day, setworking_day] = useState(state.data.working_day);
  const [time_start, settime_start] = useState(state.data.time_start);
  const [time_end, settime_end] = useState(state.data.time_end);
  const [arrDayInWeek, setarrDayInWeek] = useState(state.data.date_in_week);

  const checkDate = (item) => {
    const check = arrDayInWeek.some((date) => date === item.id);
    return check;
  };

  const onCheckDate = (item) => {
    const check = arrDayInWeek.some((date) => date ===item.id);
    if (check = true) {
      setarrDayInWeek(arrDayInWeek.filter(date => date !== item.id))
    } else {
      setarrDayInWeek(arrDayInWeek.concat(item.id))
    }
  };

  const onDeleteShifts = async () => {
    const { code, message } = await api.deleteShifts(state.data.shifts_code)
    if (code === 200) {
      history.goBack()
    }
    alert(message)
  }

  const editShifts = async () => {
    let params = {
      shifts_code: state.data.shifts_code,
      name: shiftsName,
      working_day: working_day,
      time_start: time_start,
      time_end: time_end,
      date_in_week: arrDayInWeek,
      company_id: 'NTL',
    }
    const response = await api.editShifts(params)
    if(response.code === 200){
      history.goBack()
    }
    else{
      alert('Thất bại, Vui lòng thử lại sau')
    }
  }

  return (
    <div>
      <h2 className="page-header">Chi tiết ca làm</h2>
      <div>
        <text>Thông tin ca làm</text>
        <div style={{ marginTop: 20 }}>
          <InputField
            title={"Tên ca làm"}
            value={shiftsName}
            onChangeText={(text) => {
              setshiftsName(text.target.value);
            }}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <InputField
            title={"Ngày công"}
            value={working_day}
            onChangeText={(text) => {
              setworking_day(text.target.value);
            }}
          />
        </div>


        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', paddingLeft: '30%', paddingRight: '30%', marginBottom: 30 }}>
          <TimePicker
            title={'Giờ bắt đầu'}
            value={time_start}
          onChange={(time) => settime_start(time)}
          />

          <TimePicker
            title={'Giờ kết thúc'}
            value={time_end}
          onChange={(time) => settime_end(time)}
          />
        </div>

        <div style={{ marginBottom: 30 }}>
          <text style={{ marginBottom: 30 }}>Phân ca: </text>
          {day_data.map((item) => (
            <div style={{ display: 'inline-block', flexDirection: 'row', marginLeft: 10 }}>
              <input
                checked={checkDate(item)}
                onChange={() => onCheckDate(item)}
                type="checkbox"
              />
              <text>{item.name}</text>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        <div>
          <button
            style={{backgroundColor:'red',paddingBottom:10,paddingTop:10,marginTop:30,marginRight:60,paddingRight:10,paddingLeft:10}}
            onClick={() => onDeleteShifts()}
          >
            <text style={{color:'white'}}>Xoá ca làm</text>
          </button>
        </div>

        <Button
          title={'Lưu'}
          onclick={() => editShifts()}
        />
      </div>

    </div>
  );
};

export default ChiTietCalam;
