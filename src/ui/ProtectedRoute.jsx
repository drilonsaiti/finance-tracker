// components/ProtectedRoute.jsx

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/Auth/useUser.js";
import Spinner from "./Spinner.jsx";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
        <FullPage>
          <Spinner />
        </FullPage>
    );
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
