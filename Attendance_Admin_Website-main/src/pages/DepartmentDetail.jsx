import React, { useEffect, useState } from "react";
import Table from "../components/table/Table";
import customerList from "../assets/JsonData/customers-list.json";
import api from "../api/api";
import { useLocation, useHistory } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/button";
import Modal from "../components/Modal";
import { FaTimes } from "react-icons/fa";

const PhongBan = () => {
  const [departmentName, setdepartmentName] = useState("");
  const [shifts, setshifts] = useState([]);
  const [emplyee, setemplyee] = useState([]);
  const [allEmplyee, setallEmplyee] = useState([]);
  const [isShow, setisShow] = useState(false);
  const [index, setindex] = useState(0);
  const [allShifts, setallShifts] = useState([]);
  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    getDetail();
    getUserInRoom();
    getAllEmployees();
    getShifts();
  }, []);

  const getAllEmployees = async () => {
    const { code, data } = await api.getUserList();
    if (code == 200) {
      setallEmplyee(data);
    }
  };

  const getDetail = async () => {
    const response = await api.getDepartmentDetail(state.data.department_id);
    if (response.code == 200 && response.data) {
      setshifts(response.data[0].shifts);
    }
  };

  const getShifts = async () => {
    const { code, data } = await api.getShiftsList();
    if (code == 200) {
      setallShifts(data);
    }
  };

  const getUserInRoom = async () => {
    const response = await api.getUserListByDepartment(
      state.data.department_id
    );
    if (response.code == 200 && response.data) {
      setemplyee(response.data);
    }
  };

  const onDeleteRoom = async () => {
    const { code, message } = await api.deleteRoom(state.data.department_id);
    if (code == 200) {
      history.goBack();
    }
    alert(message);
  };

  const onAddUserInToRoom = async (item) => {
    let params = {
      user_id: item.user_id,
      department_id: state.data.department_id,
    };
    const response = await api.addUserInDepartment(params);
    if (response.code == 200) {
      getDetail();
      getUserInRoom();
      getAllEmployees();
    } else {
      alert("Thất bại, vui lòng thử lại sau");
    }
  };
  const onDeleteUserFromRoom = async (item) => {
    let params = {
      user_id: item.user_id,
      department_id: state.data.department_id,
    };
    const response = await api.deleteUserInDepartment(params);
    getDetail();
    getUserInRoom();
    getAllEmployees();
    if (response.code !== 200) {
      alert("Thất bại, vi lòng thử lại sau");
    }
  };

  const isTick = (item) => {
    const check = shifts.some((data) => data.shifts_code === item.shifts_code);
    if (check === true) {
      return <text>✔️</text>;
    }
  };

  const addShiftsInDepartment = async (item) => {
    let params = {
      department_id: state.data.department_id,
      shifts: item,
    };
    const response = await api.addShiftsInDepartment(params);
    getDetail();
    getUserInRoom();
    getAllEmployees();
    if (response.code !== 200) {
      alert("Thất bại, vui lòng thử lại sau");
    }
  };

  const deleteShiftsFromRoom = async (item) => {
    let params = {
      department_id: state.data.department_id,
      shifts: item,
    };
    const response = await api.deleteShiftsInDepartment(params);
    getDetail();
    getUserInRoom();
    getAllEmployees();
    if (response.code !== 200) {
      alert("Thất bại, vui lòng thử lại sau");
    }
  };

  const renderBody = () => {
    if (index === 1) {
      return (
        <div>
          <h2>Chọn nhân viên cần thêm</h2>
          {allEmplyee.length > 0 &&
            allEmplyee.map((item) => (
              <div
                onClick={() => onAddUserInToRoom(item)}
                style={{ marginTop: 30 }}
              >
                {item.department_id === state.data.department_id && (
                  <text>✔️</text>
                )}

                <button
                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  {item.name}
                </button>
              </div>
            ))}
        </div>
      );
    } else {
      return (
        <div>
          <h2>Chọn ca làm cần thêm</h2>
          {allShifts.length > 0 &&
            allShifts.map((item) => (
              <div
                onClick={() => addShiftsInDepartment(item)}
                style={{ marginTop: 30 }}
              >
                {isTick(item)}
                <button
                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  {item.name}
                </button>
              </div>
            ))}
        </div>
      );
    }
  };
  return (
    <div style={{ flexDirection: "column", display: "flex" }}>
      <text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 30 }}>
        Chi tiết phòng ban
      </text>

      <InputField
        title={"Tên phòng ban"}
        value={state.data.name}
        onChangeText={(text) => {
          setdepartmentName(text.target.value);
        }}
      />

      <text style={{ marginTop: 50 }}>Ca làm </text>
      {shifts.length > 0 ? (
        shifts.map((item) => (
          <div style={{ marginLeft: 20, marginTop: 10 }}>
            <button
              onClick={() => deleteShiftsFromRoom(item)}
              style={{
                backgroundColor: "red",
                padding: 5,
                marginRight: 20,
                color: "white",
              }}
            >
              xoá
            </button>
            <text
              style={{
                marginLeft: 5,
                backgroundColor: "rgba(1,1,1,0.1)",
                padding: 5,
              }}
            >
              {item.name}
            </text>
          </div>
        ))
      ) : (
        <text style={{ color: "gray", marginTop: 10, textAlign: "center" }}>
          Chưa có ca làm nào, vui lòng thêm ca làm
        </text>
      )}
      <Button
        title={"Thêm ca làm"}
        onclick={() => {
          setisShow(true);
          setindex(0);
        }}
      />

      <text style={{ marginTop: 50 }}>Nhân viên</text>
      {emplyee.length > 0 ? (
        emplyee.map((item) => (
          <div style={{ marginLeft: 20, marginTop: 20 }}>
            <button
              onClick={() => onDeleteUserFromRoom(item)}
              style={{
                backgroundColor: "red",
                padding: 5,
                marginRight: 20,
                color: "white",
              }}
            >
              xoá
            </button>
            <text
              style={{
                marginLeft: 5,
                backgroundColor: "rgba(1,1,1,0.1)",
                padding: 5,
              }}
            >
              {item.name}
            </text>
          </div>
        ))
      ) : (
        <text style={{ color: "gray", marginTop: 10, textAlign: "center" }}>
          Chưa có nhân viên nào
        </text>
      )}
      <Button
        title={"Thêm nhân viên"}
        onclick={() => {
          setisShow(true);
          setindex(1);
        }}
      />

      <button
        onClick={() => onDeleteRoom()}
        style={{
          backgroundColor: "red",
          width: "20%",
          marginTop: 40,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <text style={{ color: "white", fontSize: 20 }}>Xoá phòng ban</text>
      </button>

      <Modal
        isShow={isShow}
        renderBody={renderBody}
        onClose={() => setisShow(false)}
        left="30%"
        right="30%"
      />
    </div>
  );
};

export default PhongBan;
