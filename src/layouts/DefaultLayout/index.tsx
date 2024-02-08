import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./style";
import { Header } from "../../components/Header";



export function DefaultLayout() {
    return (
        <div>
            <LayoutContainer>
                <Header />
                <Outlet />
            </LayoutContainer>
        </div>
    )
}