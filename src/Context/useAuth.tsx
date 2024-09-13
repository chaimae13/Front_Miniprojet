import React, { createContext, useEffect, useState } from "react";
import { User } from "../Models/User"
import { useNavigate } from "react-router-dom";
import { loginApi } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
    token : string | null;
    loginUser:(username:string, password: string) => void;
    logout:() => void;
    isLoggedIn:() => boolean;
};
type Props = { children : React.ReactNode};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children} : Props) =>{
    const navigate = useNavigate();
    const [token,setToken]= useState<string | null>(null);
    const [isReady,setIsready]= useState(false);

    useEffect(() => {

        const token = localStorage.getItem("accessToken");
        if( token){
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer"+ token
        }

        setIsready(true);
    }, [])

   const loginUser = async (
        Username :string,
        password: string
   )=> {
    await loginApi(Username,password).then((res) =>{
            if(res){
                localStorage.setItem("accessToken",res?.data.accessToken)
                setToken(res?.data.accessToken);
                navigate("/me");
            }

    })
    .catch((e)=> toast.warning("Server error occured")) ;
   };
   const isLoggedIn = () =>{
    return !!token;
   }

   const logout = () => {
    localStorage.removeItem("accessToken");
    setToken("")
    navigate("/")
   }

   return <UserContext.Provider value={ {loginUser,logout,isLoggedIn,token }}>
        {isReady ? children: null}

   </UserContext.Provider>
};

export const useAuth = () => React.useContext(UserContext);