import { decodeToken } from "react-jwt";
import { useSelector } from "react-redux";
import { selectCurrentUserToken } from "../features/auth/authSlice";

const useAuthUser = () => {
  const token = useSelector(selectCurrentUserToken);

  let isAdmin = false;

  let accessRight = "User";

  if (token) {
    const decodedToken = decodeToken(token);
    const { role } = decodedToken;
    isAdmin = role === "Admin";

    if (isAdmin) accessRight = "Admin";

    return { role, isAdmin, accessRight };
  }

  return { role: null, isAdmin, accessRight };
};

export default useAuthUser;
