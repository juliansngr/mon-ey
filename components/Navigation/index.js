import { useTransactionsContext } from "@/utils/TransactionsContext/TransactionsContext";
import { ChartColumn, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { css, styled } from "styled-components";

export default function Navigation() {
    const router = useRouter();
    const activeNavPoint = router.pathname
    const { handleFilterChange } = useTransactionsContext();

    useEffect(() => {
        handleFilterChange({ type: null, pattern: null });
    }, [activeNavPoint]);

    return (
        <NavContainer role="navigation" aria-label="Hauptnavigation der Website">
            <NavList>
                <NavListItem>
                    <NavItem
                        href="/"
                        aria-label="Navigiere zur Startseite"
                        aria-current={activeNavPoint}
                        $active={activeNavPoint === "/"}
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
                        aria-current={activeNavPoint}
                        $active={activeNavPoint === "/analytics"}
                    >
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

    ${props => props.$active && css`
        cursor: default;
        background-color: inherit;
        & > div {
            background-color: var(--green-800);
        }
    `}
`;

const StyledHomeIcon = styled(Home)`
    font-size: 1.5rem;
    color: var(--green-text-light, #ebfef4);
`;

const StyledAnalyseIcon = styled(ChartColumn)`
    font-size: 1.5rem;
    color: var(--green-text-light, #ebfef4);
`;
