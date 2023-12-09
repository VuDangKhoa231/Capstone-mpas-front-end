import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const ProtectRouter = () => {
    const token = useSelector((state) => state.auth?.login.accessToken)
    return(
       token ? <Outlet/> : <Navigate to={'/login'} />
    )
}

export default ProtectRouter;