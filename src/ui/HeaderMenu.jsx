import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import {HiArrowRightOnRectangle, HiOutlineUser} from "react-icons/hi2";
import {NavLink, useNavigate} from "react-router-dom";
import Logout from "../features/Auth/Logout.jsx";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;


function HeaderMenu() {

    return (
        <StyledHeaderMenu>

            <li>
                <Logout/>
            </li>
        </StyledHeaderMenu>
    );
}

export default HeaderMenu;