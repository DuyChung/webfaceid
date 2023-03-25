import React, { useEffect, useState } from "react";
import api from "../api/api";
import {useHistory} from 'react-router-dom'


const PhongBan = () => {
  
  const history = useHistory()

  const [shifts, setshifts] = useState([]);
  useEffect(() => {
    getShifts();
  }, []);

  const getShifts = async () => {
    const { code, data } = await api.getShiftsList();
    if (code === 200) {
      setshifts(data);
    }
  };
  
  return (
    <div>
      <h2 className="page-header">Ca làm</h2>
      <div>
        {shifts.length > 0 ? (
          shifts.map((item) => (
            <div
              style={{
                flexDirection: "column",
                marginBottom: 40,
                background: "rgba(0,0,0,0.1)",
                padding: 10,
              }}
            >
              <div
                onClick={() => history.push('/calamDetail',{data:item})}
                // onClick={() => console.log("=======", item)}
                style={{ flex: 1 }}
              >
                <text>{item.name}</text>
              </div>
            </div>
          ))
        ) : (
          <text>Chưa có ca làm</text>
        )}
      </div>
    </div>
  );
};

export default PhongBan;
