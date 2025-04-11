import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import { ChartColumn, Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function Navigation() {
    const { handleFilterChange } = useTransactionsContext();
    const [activePath, setActivePath] = useState("/");

    const handleNavClick = (path) => {
        handleFilterChange({ type: null, pattern: null })
        setActivePath(path);
    };

    return (
        <NavContainer role="navigation" aria-label="Hauptnavigation der Website">
            <NavList>
                <NavListItem>
                    <NavItem
                        href="/"
                        aria-label="Navigiere zur Startseite"
                        aria-current={activePath === "/" && "page"}
                        className={activePath === "/" && "active"}
                        onClick={() => handleNavClick("/")}
                    >
                        <StyledCircle aria-hidden="true">
                            <StyledHomeIcon aria-hidden="true" />
                        </StyledCircle>
                    </NavItem>
                </NavListItem>
                <NavListItem>
                    <NavItem
                        href="/analytics"
                        aria-label="Navigiere zu den Analysen"
                        aria-current={activePath === "/analytics" && "page"}
                        className={activePath === "/analytics" && "active"}
                        onClick={() => handleNavClick("/analytics")}>
                        <StyledCircle aria-hidden="true">
                            <StyledAnalyseIcon aria-hidden="true" />
                        </StyledCircle>
                    </NavItem>
                </NavListItem>
            </NavList>
        </NavContainer>
    )
}

const StyledCircle = styled.div`
    width: var(--5xl);
    height: var(--5xl);
    border-radius: 50%;
    background-color: var(--green-600);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavContainer = styled.nav`
    position: fixed;
    bottom: -1px;
    left: 0;
    width: 100%;
`;

const NavList = styled.ul`
    display: flex;
    background-color: var(--green-600);
    border-top-left-radius: var(--2xs); 
    border-top-right-radius: var(--2xs);
    overflow:hidden;
`;

const NavListItem = styled.li`
    flex: 1;
    border-right: 1px solid var(--green-50);
    &:last-child {
        border: 0;
    }
`;

const NavItem = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--2xs) 0;
    &:hover,
    &:active,
    &:focus {
        background-color: var(--green-500);
        cursor: pointer;
    }
    &.active {
        cursor: default;
        background-color: inherit;
        & > div {
            background-color: var(--green-800);
        }
    }
`;

const StyledHomeIcon = styled(Home)`
    font-size: 1.5rem;
    color: var(--green-text-light, #ebfef4);
`;

const StyledAnalyseIcon = styled(ChartColumn)`
    font-size: 1.5rem;
    color: var(--green-text-light, #ebfef4);
`;