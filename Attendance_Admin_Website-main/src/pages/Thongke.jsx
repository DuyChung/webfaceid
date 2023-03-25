import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import api from "../api/api";
import MonthYearPicker from "react-month-year-picker";
import Modal from "../components/Modal";

function App() {
  const [isShowPicker, setisShowPicker] = React.useState(false);
  const [isShowEmployee, setisShowEmployee] = React.useState(false);
  const [month, setmonth] = useState(1);
  const [year, setyear] = useState(2022);
  const [emplyee, setemplyee] = useState([]);
  const [employeeSelected, setemployeeSelected] = useState({});
  const [monthYear, setmonthYear] = useState("");
  const [dataChamcong, setdataChamcong] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const { code, data } = await api.getUserList();
    if (code == 200) {
      setemplyee(data);
    }
  };

  const renderBodyEmployee = () => {
    return emplyee.length > 0
      ? emplyee.map((item) => (
          <div style={{}}>
            <button
              onClick={() => {
                setemployeeSelected(item);
                setisShowEmployee(false);
              }}
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: 5,
                marginTop: 10,
              }}
            >
              <text style={{ fontSize: 20 }}>{item.name}</text>
            </button>
          </div>
        ))
      : null;
  };

  const renderBodyPicker = () => {
    return (
      <div>
        <MonthYearPicker
          selectedMonth={month}
          selectedYear={year}
          onChangeYear={(year) => setyear(year)}
          onChangeMonth={(month) => {
            setmonth(month);
            let months = "";
            if (month < 10) {
              months = `0${month}`;
            } else months = `${month}`;
            setmonthYear(`${months}/${year}`);
            setisShowPicker(false);
          }}
        />
      </div>
    );
  };

  const onGetChamcongList = async () => {
    const parasm = {
      user_id: employeeSelected.user_id,
      monthyear: monthYear,
    };
    const response = await api.getChamcongHistory(parasm);

    if (response.code === 200 && response.data.length > 0) {
      setdataChamcong(response.data);
    }
  };
  console.log("==========res==========", dataChamcong);
  return (
    <div>
      <button
        onClick={() => setisShowEmployee(true)}
        style={{
          borderWidth: 1,
          backgroundColor: "rgba(1,1,1,0.2)",
          alignItems: "center",
          padding: 10,
          display: "inline-block",
        }}
      >
        <text>{employeeSelected.name || "Chọn nhân viên"}</text>
        <FaCaretDown />
      </button>

      <button
        onClick={() => setisShowPicker(true)}
        style={{
          marginLeft: 50,
          borderWidth: 1,
          backgroundColor: "rgba(1,1,1,0.2)",
          alignItems: "center",
          padding: 10,
          display: "inline-block",
        }}
      >
        <text>{monthYear || "Chọn ngày"}</text>
        <FaCaretDown />
      </button>

      <button
        disabled={employeeSelected && monthYear ? false : true}
        onClick={() => {
          onGetChamcongList();
        }}
        style={{
          marginLeft: 50,
          borderWidth: 1,
          backgroundColor:
            employeeSelected && monthYear ? "green" : "rgba(0,0,0,0.2)",
          alignItems: "center",
          padding: 10,
          display: "inline-block",
        }}
      >
        <text style={{ color: "white" }}>Xem</text>
      </button>

      <Modal
        isShow={isShowEmployee}
        renderBody={renderBodyEmployee}
        onClose={() => setisShowEmployee(false)}
        left="30%"
        right="30%"
      />

      <Modal
        isShow={isShowPicker}
        renderBody={renderBodyPicker}
        onClose={() => setisShowPicker(false)}
        // left='30%'
        // right='30%'
      />

      <div style={{ marginTop: 30 }}>
        {dataChamcong.length > 0 ? (
          dataChamcong.map((item) => (
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
            >
              <div
                style={{
                  backgroundColor: "green",
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  borderRadius: 25,
                }}
              >
                <text style={{ color: "white" }}>{item.date.slice(0, 2)}</text>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.1)",
                  marginLeft: 30,
                  width: "60%",
                  padding: 20,
                }}
              >
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <text>{item.shifts.name}</text>
                  <text>{`${item.shifts.time_start}  -  ${item.shifts.time_end}`}</text>
                </div>
                <div
                  style={{
                    width: "90%",
                    height: 1,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    marginTop: 30,
                    marginBottom: 30,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                />
                <div>
                  {item.status.length === 2 && (
                    <text>{`${item.status[0]} ${
                      item.status[0] !== "" && item.status[1] !== ""
                        ? " - "
                        : ""
                    }  ${item.status[1]}`}</text>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <text style={{ fontSize: 40, fontWeight: "bold" }}>
              Danh sách trống
            </text>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
