import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";
import statusCards from "../assets/JsonData/status-card-data.json";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import DatetiemPicker from "../components/datetimePicker";
import Button from "../components/button";
import api from "../api/api";
import TimePicker from "../components/TimePicker";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import { Geolocations } from "../action/GeoAction";

const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Store Customers",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const Dashboard = () => {
  const [isShow, setisShow] = useState(false);
  const [index, setindex] = useState(null);
  //thêm nhân viên
  const [birthDay, setbirthDay] = useState(new Date());
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  const [department_id, setdepartment_id] = useState("");
  const [department, setdepartment] = useState([]);
  //thêm ca làm
  const [shiftsName, setshiftsName] = useState("");
  const [time_start, settime_start] = useState("07:00");
  const [time_end, settime_end] = useState("07:00");
  const [working_day, setworking_day] = useState(1);
  const [arrDayInWeek, setarrDayInWeek] = useState([]);
  //thêm phòng ban
  const [emplyee, setemplyee] = useState([]);
  const [departmentName, setdepartmentName] = useState("");
  const [shifts, setshifts] = useState([]);
  const [arrCheckedshifts, setarrCheckedshifts] = useState([]);
  const [location, setlocation] = useState(null);
  const [locationName, setlocationName] = useState("");
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");

  const AnyReactComponent = ({ text }) => (
    <div
      style={{
        backgroundColor: "green",
        width: 30,
        height: 30,
        borderRadius: 15,
        display: "flex",
        alignItems: "center",
      }}
    >
      <text style={{ color: "white", textAlign: "center" }}>{text}</text>
    </div>
  );

  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  useEffect(() => {
    getDepartment();
    getEmployees();
    getShifts();
    getLocation();
  }, []);

  const day_data = [
    { id: "Monday", name: "Thứ 2" },
    { id: "Tuesday", name: "Thứ 3" },
    { id: "Wednesday", name: "Thứ 4" },
    { id: "Thursday", name: "Thứ 5" },
    { id: "Friday", name: "Thứ 6" },
    { id: "Saturday", name: "Thứ 7" },
    { id: "Sunday", name: "Chủ nhật" },
  ];

  const getLocation = async () => {
    const response = await api.getCompayLocation();
    const { code, data } = response;
    if (code == 200 && data.length > 0) {
      setlocation(data[0].location);
      setlocationName(data[0].name);
    }
  };

  const checkDate = (item) => {
    const check = arrDayInWeek.some((date) => date == item.id);
    return check;
  };

  const onCheckDate = (item) => {
    const check = arrDayInWeek.some((date) => date == item.id);
    if (check === true) {
      setarrDayInWeek(arrDayInWeek.filter((date) => date !== item.id));
    } else {
      setarrDayInWeek(arrDayInWeek.concat(item.id));
    }
  };

  //lấy danh sách phòng ban
  const getDepartment = async () => {
    const { code, data } = await api.getDepartmentList();
    if (code === 200) {
      setdepartment(data);
    }
  };

  //lấy danh sách nhân viên
  const getEmployees = async () => {
    const { code, data } = await api.getUserList();
    if (code === 200) {
      setemplyee(data);
    }
  };

  //lấy danh sách ca làm
  const getShifts = async () => {
    const { code, data } = await api.getShiftsList();
    if (code === 200) {
      setshifts(data);
    }
  };

  //convert địa chỉ thành gps
  const getGPSFormAddress = async () => {
    try {
      const res = await Geolocations.getGPSByAddress(locationName);
      if (
        res.geometry &&
        res.geometry.coordinates &&
        res.geometry.coordinates.length > 0
      ) {
        setlocation({
          long: res.geometry.coordinates[0],
          lat: res.geometry.coordinates[1],
        });
      }
    } catch (error) {
      alert("Lỗi");
    }
  };

  const onAddEmployee = async () => {
    let params = {
      phone: phone,
      name: name,
      birthDay: birthDay,
      department_id: department_id,
    };
    const { code, message } = await api.resigter(params);
    if (code === 200) {
      setisShow(false);
    }
    alert(message);
  };

  const checked = (item) => {
    return item.department_id === department_id;
  };

  const oncheck = (item) => {
    setdepartment_id(item.department_id);
  };

  const onAddShifts = async () => {
    let params = {
      name: shiftsName,
      working_day: working_day,
      time_start: time_start,
      time_end: time_end,
      date_in_week: arrDayInWeek,
    };
    const { code, message } = await api.addShifts(params);
    if (code === 200) {
      setisShow(false);
    }
    alert(message);
  };

  const checkedShifts = (item) => {
    const check = arrCheckedshifts.some(
      (data) => data.shifts_code === item.shifts_code
    );
    return check;
  };

  const oncheckShifts = (item) => {
    const check = arrCheckedshifts.some(
      (data) => data.shifts_code === item.shifts_code
    );
    if (check === true) {
      setarrCheckedshifts(
        arrCheckedshifts.filter((data) => data.shifts_code !== item.shifts_code)
      );
    } else {
      setarrCheckedshifts(arrCheckedshifts.concat(item));
    }
  };

  const onAddDepartment = async () => {
    let params = {
      name: departmentName,
      shifts: arrCheckedshifts,
    };
    const { code, message } = await api.addRoom(params);
    if (code === 200) {
      setisShow(false);
    }
    alert(message || "Thất bại");
  };

  const renderBody = () => {
    if (index === 0) {
      return (
        <div>
          <h2 style={{ marginBottom: 30 }}>Thêm nhân viên</h2>
          <InputField
            title={"Họ và tên"}
            onChangeText={(text) => {
              setname(text.target.value);
            }}
            value={name}
          />
          <div style={{ marginTop: 20 }}>
            <InputField
              title={"Số điện thoại"}
              onChangeText={(text) => {
                setphone(text.target.value);
              }}
              value={phone}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <DatetiemPicker
              title={"Ngày sinh"}
              format={"d/MM/y"}
              value={birthDay}
              onChange={(date) => setbirthDay(date)}
            />
          </div>

          <div style={{ flexDirection: "row", display: "flex", marginTop: 20 }}>
            <text>Phòng ban:</text>
            {department.length > 0 &&
              department.map((item) => (
                <div style={{ marginLeft: 20 }}>
                  <input
                    style={{ marginRight: 5 }}
                    type="checkbox"
                    checked={checked(item)}
                    onChange={() => oncheck(item)}
                  />
                  <text>{item.name}</text>
                </div>
              ))}
          </div>

          <Button title={"Thêm nhân viên"} onclick={() => onAddEmployee()} />
        </div>
      );
    } else if (index === 1) {
      return (
        <div>
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

            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "30%",
                paddingRight: "30%",
              }}
            >
              <TimePicker
                title={"Giờ bắt đầu"}
                value={time_start}
                onChange={(time) => settime_start(time)}
              />

              <TimePicker
                title={"Giờ kết thúc"}
                value={time_end}
                onChange={(time) => settime_end(time)}
              />
            </div>

            <div style={{ marginTop: 20, marginBottom: 50 }}></div>

            <div style={{ marginBottom: 30 }}>
              <text style={{ marginBottom: 30 }}>Phân ca: </text>
              {day_data.map((item) => (
                <div
                  style={{
                    display: "inline-block",
                    flexDirection: "row",
                    marginLeft: 10,
                  }}
                >
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
          <Button title={"Thêm ca làm"} onclick={() => onAddShifts()} />
        </div>
      );
    } else if (index === 2) {
      return (
        <div style={{ flexDirection: "column", display: "flex" }}>
          <text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 30 }}>
            Thêm phòng ban
          </text>

          <InputField
            title={"Tên phòng ban"}
            onChangeText={(text) => {
              setdepartmentName(text.target.value);
            }}
            value={departmentName}
          />

          <text style={{ marginTop: 50 }}>Ca làm </text>
          {shifts.length > 0 ? (
            shifts.map((item) => (
              <div style={{ marginLeft: 20, marginTop: 10 }}>
                <input
                  style={{ marginRight: 5 }}
                  type="checkbox"
                  checked={checkedShifts(item)}
                  onChange={() => oncheckShifts(item)}
                />
                <text style={{ marginLeft: 5 }}>{item.name}</text>
              </div>
            ))
          ) : (
            <text style={{ color: "gray", marginTop: 10, textAlign: "center" }}>
              Chưa có ca làm nào, vui lòng thêm ca làm
            </text>
          )}

          <Button title={"Thêm phòng ban"} onclick={() => onAddDepartment()} />
        </div>
      );
    }
  };

  const editCompayLocation = async () => {
    const res = await api.editCompayLocation({
      name: locationName,
      location: location,
    });
    console.log("=====res=====", res);
    if (res.code === 200) {
      alert("Thay đổi ví trí thành công");
    } else {
      alert("Thất bại");
    }
  };

  const getGPSFromAddress = async () => {
    const respomse = await Geolocations.getAddress({
      lat: lat,
      long: long,
    });
    setlocationName(respomse);
  };

  const center = {
    lat: location ? location.lat : 11.667478,
    lng: location ? location.long : 106.626415,
  };
  const zoom = 11;
  return (
    <>
      <Modal
        isShow={isShow}
        renderBody={renderBody}
        onClose={() => setisShow(false)}
      />
      <div style={{ zIndex: 0 }}>
        <h2 className="page-header">Trang chủ</h2>
        <div className="row">
          <div style={{ zIndex: 0 }} className="col-6">
            <div className="row">
              {statusCards.map((item, index) => (
                <Link
                  to={index === 3 ? "/thong_ke" : "/"}
                  onClick={() => {
                    if (index === 3) {
                    } else {
                      setisShow(true);
                      setindex(index);
                    }
                  }}
                  className="col-6"
                  key={index}
                >
                  <StatusCard title={item.title} />
                </Link>
              ))}
            </div>
          </div>

          <div style={{ zIndex: 0 }} className="col-6">
            <div className="card full-height">
              {/* chart */}
              <Chart
                options={
                  themeReducer === "theme-mode-dark"
                    ? {
                        ...chartOptions.options,
                        theme: { mode: "dark" },
                      }
                    : {
                        ...chartOptions.options,
                        theme: { mode: "light" },
                      }
                }
                series={chartOptions.series}
                type="line"
                height="100%"
              />
            </div>
          </div>
        </div>
        <div style={{ height: "100vh", width: "100%" }}>
          {location && (
            <>
              <div
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0)",
                  padding: 10,
                  width: "100%",
                  marginBottom: 5,
                }}
              >
                <input
                  onChange={(text) => {
                    setlocationName(text.target.value);
                  }}
                  style={{
                    width: "90%",
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.4)",
                  }}
                  value={locationName}
                />
                <button
                  style={{
                    backgroundColor: "green",
                    padding: 5,
                    color: "white",
                    marginLeft: 7,
                  }}
                  onClick={() => getGPSFormAddress()}
                >
                  Tìm kiếm
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <text>------------------ Hoặc -----------------</text>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                  paddingRight: 25,
                  paddingLeft: 25,
                }}
              >
                <div>
                  <text>Kinh độ</text>
                  <input
                    onChange={(text) => {
                      setlong(text.target.value);
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.4)",
                      padding: 5,
                      marginLeft: 5,
                    }}
                  />
                </div>
                <div>
                  <text>Vĩ độ</text>
                  <input
                    onChange={(text) => {
                      setlat(text.target.value);
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.4)",
                      padding: 5,
                      marginLeft: 5,
                    }}
                  />
                </div>
                <button
                  disabled={lat && long ? false : true}
                  style={{
                    backgroundColor: lat && long ? "green" : "grey",
                    color: "white",
                    padding: 5,
                  }}
                  onClick={() => {
                    setlocation({ lat: lat, long: long });
                    getGPSFromAddress();
                  }}
                >
                  Tìm kiếm
                </button>
              </div>

              <button
                onClick={() => editCompayLocation()}
                style={{
                  marginBottom: 20,
                  marginTop: 40,
                  backgroundColor: "green",
                  color: "white",
                  padding: 5,
                }}
              >
                Thay đổi vị trí
              </button>
              <GoogleMapReact defaultCenter={center} defaultZoom={zoom}>
                <AnyReactComponent
                  lat={location.lat}
                  lng={location.long}
                  text="Công Ty"
                />
              </GoogleMapReact>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
