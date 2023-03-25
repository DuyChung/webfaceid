import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useLocation, useHistory } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/button";
import DateTimePicker from "../components/datetimePicker";

const ChiTietNhanVien = () => {
  const { state } = useLocation();

  const history = useHistory();
  const [department, setdepartment] = useState([]);
  const [departmentnamne, setdepartmentname] = useState("");
  const [phone, setphone] = useState(state.data.phone);
  const [name, setname] = useState(state.data.name);
  const [day_of_birth, setday_of_birth] = useState(state.data.day_of_birth);

  useEffect(() => {
    getDepartment();
  }, []);

  const getDepartment = async () => {
    const { code, data } = await api.getDepartmentList();
    if (code === 200) {
      setdepartment(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].department_id === state.data.department_id) {
          setdepartmentname(data[i].name);
        }
      }
    }
  };

  const onDeleteUser = async () => {
    console.log(state.data.user_id);
    const { code, message } = await api.deleteUser(state.data.user_id);
    if (code === 200) {
      history.goBack();
    }
    alert(message);
  };
  const onChangeInfo = async () => {
    let params = {
      user_id: phone,
      phone: phone,
      day_of_birth: day_of_birth,
      name: name,
    };
    const response = await api.change_user_info(params);
    if (response.code === 200) {
      history.goBack();
    }
    alert(response.message);
  };
  return (
    <div>
      <h2 className="page-header">Chi tiết nhân viên</h2>
      <div>
        <text>Thông tin cá nhân</text>
        <div style={{ marginTop: 20 }}>
          <InputField
            title={"Họ và tên"}
            value={name}
            onChangeText={(text) => {
              setname(text.target.value);
            }}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <DateTimePicker
            value={day_of_birth}
            onChange={(date) => setday_of_birth(date)}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <InputField
            title={"Số điện thoại"}
            value={phone}
            onChangeText={(text) => {
              setphone(text.target.value);
            }}
          />
        </div>

        <div style={{ marginTop: 20, marginBottom: 50 }}>
          <InputField
            title={"Phòng ban"}
            value={departmentnamne}
            disabled={true}
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            onDeleteUser();
          }}
          style={{ backgroundColor: "red", padding: 10, marginRight: 50 }}
        >
          <text style={{ color: "white" }}>Xoá nhân viên</text>
        </button>
        <Button
          title={"Lưu"}
          onclick={() => {
            onChangeInfo();
          }}
        />
      </div>
    </div>
  );
};

export default ChiTietNhanVien;
