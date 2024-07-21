import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns:  1fr;
  grid-template-rows:  1fr;
`;

const Main = styled.main`
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
    <Main>
        <Outlet />

    </Main>


    </StyledAppLayout>
  );
}

export default AppLayout;
