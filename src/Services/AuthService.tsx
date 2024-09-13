import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

interface LoginDto {
    username: string;
    password: string;
}


export const loginApi= async (username :string,password:string) =>{
try {
    const data = await axios.post<UserProfileToken>("http://localhost:9090/api/Users/authenticate",{
        username:username,
        password:password,
    });
    return data;
} catch (error) {
    handleError(error);
}
}

const logout = () =>{
    localStorage.clear();
}

const authService = {
    loginApi,
    logout,
}

export default authService;