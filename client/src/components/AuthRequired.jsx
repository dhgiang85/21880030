import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useEffect } from "react";
import setAuthToken from "../utils/setAuthToken";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "../features/auth/authSlice";

import axios from "axios";
import { API_URL } from "../constants/index";
const AuthRequired = ({ allowedRoles }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { role } = useAuthUser();
	const loadUser = async () => {
		if (localStorage["user"]) {
			setAuthToken(JSON.parse(localStorage["user"])?.token)
		}
		try{
			const {data, status} = await axios.get(`${API_URL}/auth`)
			if(status === 200){
				if(data.success){
					dispatch(logIn(data))
				}
			}
		}
		catch(error){			
			setAuthToken(null)
			dispatch(logOut())
			navigate("user/login")
			return
		}
	};
	useEffect(() => {loadUser()}, [])
	return  allowedRoles.includes(role) ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default AuthRequired;
