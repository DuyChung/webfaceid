const axios = require("axios");

const url = "https://attendance-server-vswr.vercel.app";
const mapboxAPIKey =
  "pk.eyJ1IjoibWFrZWZhbW91c2FwcCIsImEiOiJja3NiZXF3aDQwNjM1MnFvMDFpa3JrcWR4In0.QBz3cnjx8gaa3bnVGyfR7Q";

export default {
  //thêm nhân viên
  async resigter(params) {
    return axios
      .post(`${url}/users/register`, {
        user_id: params.phone,
        company_id: "NTL",
        name: params.name,
        phone: params.phone,
        day_of_birth: params.birthDay,
        password: "123",
        department_id: params.department_id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //xoá nhân viên
  async deleteUser(id) {
    return axios
      .post(`${url}/users/deleteUser`, {
        user_id: id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //lấy danh sách lịch sử điểm danh
  async getAttendanceHistory(id) {
    return axios
      .post(`${url}/attendance/getAttendanceList`, {
        user_id: id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //lấy danh sách lịch sử chấm công
  async getChamcongHistory(params) {
    return axios
      .post(`${url}/chamcong/getChamcongList`, {
        user_id: params.user_id,
        monthyear: params.monthyear,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //thêm ca làm
  async addShifts(params) {
    return axios
      .post(`${url}/shifts/addShifts`, {
        name: params.name,
        working_day: params.working_day,
        time_start: params.time_start,
        time_end: params.time_end,
        date_in_week: params.date_in_week,
        company_id: "NTL",
        shifts_code: Math.random(),
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //danh sách ca làm
  async getShiftsList(id = "NTL") {
    return axios
      .post(`${url}/shifts/getShiftsList`, {
        company_id: id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //sửa ca làm
  async editShifts(params) {
    return axios
      .post(`${url}/shifts/editShifts`, {
        shifts_code: params.shifts_code,
        name: params.name,
        working_day: params.working_day,
        time_start: params.time_start,
        time_end: params.time_end,
        date_in_week: params.date_in_week,
        company_id: params.company_id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //xoá ca làm
  async deleteShifts(code) {
    return axios
      .post(`${url}/shifts/deleteShifts`, {
        company_id: "NTL",
        shifts_code: code,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //lấy danh sách user trong công ty
  async getUserList(id = "NTL") {
    return axios
      .post(`${url}/users/getUserList`, {
        company_id: id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //tìm kiếm user bằng id
  async findUserById(id) {
    return axios
      .post(`${url}/users/findUserById`, {
        user_id: id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  async addEmployee(user_id, company_id) {
    return axios
      .post(`${url}/users/changeinfo`, {
        user_id: user_id,
        company_id: company_id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  async addRoom(params) {
    console.log(JSON.stringify(params));
    return axios
      .post(`${url}/room/addRoom`, {
        name: params.name,
        shifts: params.shifts,
        employees: [],
        company_id: "NTL",
        department_id: Math.random(),
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  async editRoom(params) {
    return axios
      .post(`${url}/room/editRoom`, {
        name: params.name,
        shifts: params.shifts,
        employees: params.employees,
        company_id: params.company_id,
        department_id: params.department_id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  async deleteRoom(id) {
    return axios
      .post(`${url}/room/deleteRoom`, {
        company_id: "NTL",
        department_id: id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  async getDepartmentList(id = "NTL") {
    return axios
      .post(`${url}/room/getRoomList`, {
        company_id: id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  async changeDepartment(user_id, room) {
    return axios
      .post(`${url}/users/changeinfo`, {
        user_id: user_id,
        room: room,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //đổi thông tin cá nhân
  async change_user_info(params) {
    return axios
      .post(`${url}/users/changeinfo`, {
        user_id: params.user_id,
        phone: params.phone,
        day_of_birth: params.day_of_birth,
        avatar: params.avatar,
        name: params.name,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //lấy danh sách nhân viên trong phòng ban
  async getUserListByDepartment(department_id) {
    return axios
      .post(`${url}/users/getUserByDepartment`, {
        department_id: department_id,
        company_id: "NTL",
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //xoá nhân viên khỏi phòng ban
  async deleteUserInDepartment(params) {
    return axios
      .post(`${url}/room/deleteOneEmployee`, {
        department_id: params.department_id,
        company_id: "NTL",
        user_id: params.user_id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //thêm nhân viên vào phòng ban
  async addUserInDepartment(params) {
    return axios
      .post(`${url}/room/insertOneEmployee`, {
        department_id: params.department_id,
        company_id: "NTL",
        user_id: params.user_id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //thêm ca làm vào phòng ban
  async addShiftsInDepartment(params) {
    return axios
      .post(`${url}/room/insertShifts`, {
        department_id: params.department_id,
        company_id: "NTL",
        shifts: params.shifts,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //xoá ca làm khỏi phòng ban
  async deleteShiftsInDepartment(params) {
    return axios
      .post(`${url}/room/deleteShifts`, {
        department_id: params.department_id,
        company_id: "NTL",
        shifts: params.shifts,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //lấy chi tiết phòng ban
  async getDepartmentDetail(id) {
    return axios
      .post(`${url}/room/getRoomDetail`, {
        department_id: id,
        company_id: "NTL",
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //lấy danh sách ca làm trong ngày
  async getShiftsInDay(params) {
    return axios
      .post(`${url}/shifts/getShiftsByDay`, {
        department_id: params.department_id,
        company_id: params.company_id,
        day: params.day,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //lấy danh sách chấm công theo ngày
  async getChamcongInDay(params) {
    return axios
      .post(`${url}/chamcong/getChamcongByDay`, {
        user_id: params.user_id,
        day: params.day,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //Đổi mật khẩu
  async changePassword(params) {
    return axios
      .post(`${url}/users/ChanePassword`, {
        user_id: params.user_id,
        old_password: params.old_password,
        new_password: params.new_password,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //Lấy vị trí công ty
  async getCompayLocation(company_id = "NTL") {
    return axios
      .post(`${url}/location/getLocationList`, {
        company_id: company_id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //thêm vị trí công ty
  async addCompayLocation(params) {
    return axios
      .post(`${url}/location/addLocation`, {
        name: params.name,
        location: params.location,
        company_id: params.company_id,
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //sửa vị trí công ty
  async editCompayLocation(params) {
    return axios
      .post(`${url}/location/editLocation`, {
        name: params.name,
        location: params.location,
        company_id: "NTL",
      })
      .then(function (response) {
        if (response.data) {
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  // convert address toi GPS
  async getGPS(params) {
    return axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${params}.json?access_token=${mapboxAPIKey}&language=vi&country=vn`
      )
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  //convert GPS to address detail
  async getLocation(params) {
    return axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${params.long},${params.lat}.json?access_token=${mapboxAPIKey}&language=vi&country=vn`
      )
      .then(function (response) {
        if (response.data) {
          return response.data.features[0].place_name;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
