import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  return loggedIn ? (
    children
  ) : (
    <Navigate to="/" replace state={{ requireLogin: true }} />
  );
};

export default ProtectedRoute;
