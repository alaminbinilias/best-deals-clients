import React, { useContext } from 'react';
import AuthContext from '../AuthContext/Context/Context';
import { Navigate } from 'react-router';
import LoadingSection from '../LoadingSection/LoadingSection';

const ProtectedRoutes = ({children}) => {
    const {user,Loading}=useContext(AuthContext);

    //console.log(Loading);
        if(Loading){
         return <LoadingSection></LoadingSection>;
    }

    if(user){
        return children;
    }
    else{
        return <Navigate to='/login'></Navigate>
    }
};

export default ProtectedRoutes;