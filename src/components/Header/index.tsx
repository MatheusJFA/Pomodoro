import { HeaderContainer } from "./style";

import {Timer, Scroll} from "phosphor-react";
import Logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";


export function Header() {
    return (
        <HeaderContainer>
            <img src={Logo} alt="Logo da aplicação que é um tomate com um relógio dentro" />

            <nav>
                <NavLink to="/">
                    <Timer size={24}/>
                </NavLink>
                <NavLink to="/history">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}