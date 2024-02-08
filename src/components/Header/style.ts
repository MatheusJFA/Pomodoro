import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        width: 3rem;
        height: 3rem;

        filter: invert(.5) sepia(1) saturate(10) hue-rotate(0deg);
    }

    nav {
        display: flex;
        gap: 0.5rem;

        a {
            width: 3rem;
            height: 3rem;

            display: flex;
            justify-content: center;
            align-items: center;

            box-shadow: none;

            color: ${props => props.theme["gray-100"]};

            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;

            &:hover {
                border-bottom: 3px solid ${props => props.theme["primary-500"]};
            }

            &.active {
                color: ${props => props.theme["primary-500"] }
            }
        }
    }



`