import styled from "styled-components";
import HeaderMenu from "./HeaderMenu.jsx";
import {NavLink} from "react-router-dom";


const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
        @media only screen and (max-width: 450px) {
            gap: 0;
            padding: 1.2rem 1.4rem;
        }
    }

    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-brand-700);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.2rem;
        height: 2.2rem;
        font-size: 2rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }

`;


const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledHeaderMenu>
                <StyledNavLink replace to="/finance">
                    <p className="name">Finances</p>
                </StyledNavLink>
                <StyledNavLink replace to="/dashboard">
                    <p className="name">Dashboard</p>
                </StyledNavLink>
            </StyledHeaderMenu>
            <HeaderMenu />
        </StyledHeader>
    );
}

export default Header;