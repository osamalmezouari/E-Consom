import React, {ReactNode, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router';
import {userContext} from "../App.tsx";

interface ProtectedFormProps {
    children: ReactNode;
}

const ProtectedForm: React.FC<ProtectedFormProps> = ({children}) => {
    const navigate = useNavigate();
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
};

export default ProtectedForm;
