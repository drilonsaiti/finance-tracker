import styled from "styled-components";
import Heading from "../ui/Heading";
import LoginForm from "../features/Auth/LoginForm.jsx";

const LoginLayout = styled.main`
    display: grid;
    grid-template-columns: 48rem;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    background-color: var(--color-grey-50);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

function Login() {
    return (
        <LoginLayout>
            <Heading as="h4">Log in to your account</Heading>
            <LoginForm/>
        </LoginLayout>
    );
}

export default Login;
