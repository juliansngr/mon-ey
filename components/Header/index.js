import Link from "next/link";
import styled from "styled-components";

export default function Header() {

    return (
        <StyledHeader>
            <LogoContainer>
                <StyledEmoji aria-hidden="true">💸</StyledEmoji>
            </LogoContainer>
            <HomeLink
                href="/"
                aria-label="Startseite von mon ey"
            >
                <AppName>
                    mon-<span>ey</span>
                    <AppNameText>Denn WIR wissen, wo DEIN Geld ab bleibt!</AppNameText>
                </AppName>
            </HomeLink>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 var(--3xs) var(--xs);
    background-color: var(--bgHeader);
    box-shadow: var(--box-shadow-default);
    border-bottom-left-radius: var(--2xs); 
    border-bottom-right-radius: var(--2xs);
    overflow:hidden;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: var(--xl);
  padding-top: var(--2xs);
`;

const StyledEmoji = styled.span`
  font-size: var(--5xl);
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeLink = styled(Link)`
    flex-grow: 1;  
    &:hover {
        cursor: pointer;
    }
`;

const AppName = styled.div`
   text-align: center;
   margin-right: calc( var(--5xl) + var(--xl) );
  color: var(--headerColor);
  font-size: var(--3xl);
  font-weight: 600;
 
  & span:nth-child(1)  {
    display: inline-block;
    transform: rotate(20deg);
    transform-origin: center;
  }
`;

const AppNameText = styled.span`
    display:block;
    font-size: var(--2xs);
    font-weight: 500;
    margin-top: var(--2xs);
    letter-spacing: var(--4xs);
`;

