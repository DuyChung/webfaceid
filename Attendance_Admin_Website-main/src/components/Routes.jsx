import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Employee from '../pages/emplyees'
import PhongBan from '../pages/PhonBan'
import CaLam from'../pages/CaLam'
import ThongKe from '../pages/Thongke'
import DepartmentDetail from '../pages/DepartmentDetail'
import calamDetail from '../pages/calamDetail'
import employeeDetail from '../pages/employeeDetail'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/nhan_vien' component={Employee}/>
            <Route path='/phong_ban' component={PhongBan}/>
            <Route path='/ca_lam' component={CaLam}/>
            <Route path='/thong_ke' component={ThongKe}/>
            <Route path='/DepartmentDetail' component={DepartmentDetail}/>
            <Route path='/calamDetail' component={calamDetail}/>
            <Route path='/employeeDetail' component={employeeDetail}/>
        </Switch>
    )
}

export default Routes
