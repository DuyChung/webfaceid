import React, { useEffect, useState } from 'react'

import Table from '../components/table/Table'
import api from '../api/api'
import moment from 'moment'
import { useHistory } from 'react-router-dom'


const customerTableHead = [
    'Họ và tên',
    'Ngày sinh',
    'Số diện thoại',
]


function Customers() {
    useEffect(() => {
        getEmployees();
    }, [])

    const history = useHistory();
    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (

        <tr key={index}>

            <td>{
                <div onClick={() => history.push('/employeeDetail', { data: item })}>
                    <text>{item.name}</text>
                </div>}
            </td>
            <td>
                <div onClick={() => history.push('/employeeDetail', { data: item })}>
                    <text>{moment(item.day_of_birth).format('DD/MM/YYYY')}</text>
                </div>
            </td>

            <td>
                <div onClick={() => history.push('/employeeDetail', { data: item })}>
                    <text>{item.phone}</text>
                </div>
              
            </td>

        </tr>
    )


    const getEmployees = async () => {
        const { code, data } = await api.getUserList()
        if (code === 200) {
            setemplyee(data)
        }
    }
    const [emplyee, setemplyee] = useState([])

    return (
        <div>
            <h2 className="page-header">
                Nhân viên
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                emplyee.length > 0 && <Table
                                    limit='10'
                                    headData={customerTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={emplyee}
                                    renderBody={(item, index) => renderBody(item, index)}
                                />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
