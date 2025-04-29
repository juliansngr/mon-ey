import { BadgeEuro, ChartColumn, ContactRound, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { css, styled } from "styled-components";

export default function Navigation() {
  const router = useRouter();
  const activeNavPoint = router.pathname;

  if (router.pathname === "/") {
    return;
  }

  return (
    <NavContainer role="navigation" aria-label="Hauptnavigation der Website">
      <NavList>
        <NavListItem>
          <NavItem
            href="/dashboard"
            aria-label="Navigiere zur Startseite"
            aria-current={activeNavPoint === "/dashboard" ? "page" : undefined}
            $active={activeNavPoint === "/dashboard"}
          >
            <StyledNavText>
              <span>Startseite</span>
            </StyledNavText>
            <StyledCircle aria-hidden="true">
              <StyledHomeIcon aria-hidden="true" />
            </StyledCircle>
          </NavItem>
        </NavListItem>
        <NavListItem>
          <NavItem
            href="/analytics"
            aria-label="Navigiere zu den Analysen"
            aria-current={activeNavPoint === "/analytics" ? "page" : undefined}
            $active={activeNavPoint === "/analytics"}
          >
            <StyledNavText>
              <span>Analysen</span>
            </StyledNavText>
            <StyledCircle aria-hidden="true">
              <StyledAnalyseIcon aria-hidden="true" />
            </StyledCircle>
          </NavItem>
        </NavListItem>
        <NavListItem>
          <NavItem
            href="/moneygpt"
            aria-label="Navigiere zur moneyGPT KI"
            aria-current={activeNavPoint === "/moneygpt" ? "page" : undefined}
            $active={activeNavPoint === "/moneygpt"}
          >
            <StyledNavText>
              <span>moneyGPT</span>
            </StyledNavText>
            <StyledCircle aria-hidden="true">
              <StyledMoneyGPTIcon aria-hidden="true" />
            </StyledCircle>
          </NavItem>
        </NavListItem>
        <NavListItem>
          <NavItem
            href="/profile"
            aria-label="Navigiere zur deiner Profil Seite"
            aria-current={activeNavPoint === "/profile" ? "page" : undefined}
            $active={activeNavPoint === "/profile"}
          >
            <StyledNavText>
              <span>Profil</span>
            </StyledNavText>
            <StyledCircle aria-hidden="true">
              <StyledProfileIcon aria-hidden="true" />
            </StyledCircle>
          </NavItem>
        </NavListItem>
      </NavList>
    </NavContainer>
  );
}

const StyledCircle = styled.div`
  width: var(--5xl);
  height: var(--5xl);
  border-radius: 50%;
  background-color: var(--green-600);
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledNavText = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: block;
    color: var(--green-text-light);
    padding: var(--4xs) var(--xs) var(--3xs);
  }
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
  overflow: hidden;
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

  ${(props) =>
    props.$active &&
    css`
      cursor: default;
      background-color: inherit;
      & > div {
        background-color: var(--green-800);
      }
      & > span {
        scale: 1.1;
        font-weight: 700;
        letter-spacing: 2px;
        border-radius: var(--xs);
        background-color: var(--green-800);
      }
    `}
  @media (min-width: 768px) {
    padding: var(--base) 0;
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

const StyledMoneyGPTIcon = styled(BadgeEuro)`
  font-size: 1.5rem;
  color: var(--green-text-light, #ebfef4);
`;

const StyledProfileIcon = styled(ContactRound)`
  font-size: 1.5rem;
  color: var(--green-text-light, #ebfef4);
`;
