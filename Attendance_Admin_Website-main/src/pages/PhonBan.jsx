import React, { useEffect, useState } from "react";
import api from "../api/api";
import Button from "../components/button";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import { FaAngleDown } from "react-icons/fa";
import {useHistory } from 'react-router-dom'

const PhongBan = () => {
  const [department, setdepartment] = useState([]);
  const [isShow, setisShow] = useState(false);
  const [shifts, setshifts] = useState([]);
  const [emplyee, setemplyee] = useState([]);
  const [isShowShiftsList, setisShowShiftsList] = useState(false);
  const [isShowEmployeesList, setisShowEmployeesList] = useState(false);
  const [arrCheckShift, setarrCheckShift] = useState([]);
  const [arrCheckEmployee, setarrCheckEmployee] = useState([]);
  const [departmentName, setdepartmentName] = useState('')

  useEffect(() => {
    getDepartment();
    getShifts();
    getEmployees();
  }, []);

  const history = useHistory()
  //lấy danh sách phòng ban
  const getDepartment = async () => {
    const { code, data } = await api.getDepartmentList();
    if (code == 200) {
      setdepartment(data);
    }
  };

  //lấy danh sach ca làm
  const getShifts = async () => {
    const { code, data } = await api.getShiftsList();
    if (code == 200) {
      setshifts(data);
    }
  };

  //lấy danh sách nhân viên
  const getEmployees = async () => {
    const { code, data } = await api.getUserList();
    if (code == 200) {
      setemplyee(data);
    }
  };

  const onAddPhongBan = async () => {
    const response = await api.addRoom({
      name:departmentName,
      shifts:arrCheckShift,
      employees:arrCheckEmployee,
    })
    if(response.code == 200){
      alert('Thành công');
      setisShow(false);
      getDepartment();
    }
    else{
      alert('Thất bại');
    }
  };

  const changeModal = () => {
    setisShow(true)
  };

  const checkedShifts = (item) => {
    const check = arrCheckShift.some((id) => id === item.shifts_code);
    return check;
  };
  const onCheckShifts = (item) => {
    const check = arrCheckShift.some((id) => id === item.shifts_code);
    if (check === true) {
      setarrCheckShift(arrCheckShift.filter((id) => id !== item.shifts_code));
    } else {
      setarrCheckShift(arrCheckShift.concat(item.shifts_code));
    }
  };

  const checkedEmployee = (item) => {
    const check = arrCheckEmployee.some((id) => id === item.user_id);
    return check;
  };
  const onCheckEmployee = (item) => {
    const check = arrCheckEmployee.some((id) => id === item.user_id);
    if (check === true) {
      setarrCheckEmployee(arrCheckEmployee.filter((id) => id !== item.user_id));
    } else {
      setarrCheckEmployee(arrCheckEmployee.concat(item.user_id));
    }
  };

  const renderBody = () => {
    return (
      <div style={{ flexDirection: "column", display: "flex" }}>
        <text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 30 }}>
          Thêm phòng ban
        </text>

        <InputField title={"Tên phòng ban"} onChangeText={(text)=>{setdepartmentName(text.target.value)}}/>

        <button
          onClick={() => setisShowShiftsList(!isShowShiftsList)}
          style={{
            marginTop: 20,
            alignItems: "center",
            display: "flex",
            backgroundColor: "white",
          }}
        >
          <text>Ca làm </text>
          <FaAngleDown />
        </button>
        {isShowShiftsList &&
          (shifts.length > 0 ? (
            shifts.map((item) => (
              <div style={{ marginLeft: 20, marginTop: 10 }}>
                <input
                  checked={checkedShifts(item)}
                  onChange={() => onCheckShifts(item)}
                  type="checkbox"
                />
                <text style={{ marginLeft: 5 }}>{item.name}</text>
              </div>
            ))
          ) : (
            <text style={{ color: "gray", marginTop: 10 }}>
              Chưa có ca làm nào, vui lòng thêm ca làm
            </text>
          ))}

        <button
          onClick={() => setisShowEmployeesList(!isShowEmployeesList)}
          style={{
            marginTop: 20,
            alignItems: "center",
            display: "flex",
            backgroundColor: "white",
          }}
        >
          <text>Nhân viên</text>
          <FaAngleDown />
        </button>
        {isShowEmployeesList &&
          (emplyee.length > 0 ? (
            emplyee.map((item) => (
              <div style={{ marginLeft: 20, marginTop: 10 }}>
                <input
                  checked={checkedEmployee(item)}
                  onChange={() => onCheckEmployee(item)}
                  type="checkbox"
                />
                <text style={{ marginLeft: 5 }}>{item.name}</text>
              </div>
            ))
          ) : (
            <text style={{ color: "gray", marginTop: 10 }}>
              Chưa có nhân viên nào
            </text>
          ))}

          {/* <Button
            style ={{marginTop:20}}
            title={'THÊM'}
            onclick={onAddPhongBan}
          /> */}
      </div>
    );
  };
 
  const onCloseModal=()=>{
    setisShow(false)
  }
  return (
    <div>
      <h2 className="page-header">Phòng ban</h2>
      <div>
        {department.length > 0 ? (
          department.map((item) => (
            <div
              style={{
                flexDirection: "column",
                marginBottom: 40,
                background: "rgba(0,0,0,0.1)",
                padding: 10,
              }}
            >
              <div
                onClick={() =>history.push('/DepartmentDetail',{data:item})}
                style={{ flex: 1 }}
              >
                <text>{item.name}</text>
              </div>
            </div>
          ))
        ) : (
          <text>Chưa có phòng ban nào</text>
        )}


        <Modal isShow={isShow} renderBody={renderBody} onClose={()=>onCloseModal()} />
      </div>
    </div>
  );
};

export default PhongBan;
