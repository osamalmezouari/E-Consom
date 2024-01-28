import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router';
import {userContext} from "../App.tsx";

const Protectedtable = ({children}) => {
    const navigate = useNavigate()
    const contextvalue = useContext(userContext);
    const {user} = contextvalue

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            localStorage.clear()
            location.reload()
        } else if (token && (user.isAdmin && !user.active_statue)) {
            navigate('/Dashboard');
            location.reload()
        }
    }, [navigate]);
    return <>{children}</>
}
export default Protectedtable