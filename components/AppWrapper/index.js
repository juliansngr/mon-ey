
import { useRouter } from "next/router";
import styled from "styled-components";

export default function AppWrapper({ children }) {
    const router = useRouter();

    // Check if is Home-Seite
    const isHomePage = router.pathname === "/";

    // Show navigation only if not on the home page
    const showNavigation = !(isHomePage);

    return (
        <AppWrapperContainer showNavigation={showNavigation}>
            {children}
        </AppWrapperContainer>
    );
}

const AppWrapperContainer = styled.div`
  display: grid;
  min-height: ${props => props.showNavigation ? '100vh' : 'auto'};
  width: 100%;
  
  /* Mobile Layout */
  grid-template-rows: auto 1fr ${props => props.showNavigation ? 'auto' : '0'};
  grid-template-columns: 1fr;
  grid-template-areas: 
    "header"
    "main"
    ${props => props.showNavigation ? '"nav"' : '"main"'};
  gap: 0;

  @media (min-width: 768px) {
    grid-template-rows: auto 1fr;
    grid-template-columns: ${props => props.showNavigation ? '12.5rem 1fr' : '1fr'};
    grid-template-areas:
      "header header"
      ${props => props.showNavigation ? '"nav main"' : '"main main"'};
    max-width: none;
    margin: 0;
    gap: var(--xl);
 
    & > header {
      grid-area: header;
      z-index: 30;
      @media (min-width: 768px) {
        border-bottom-left-radius: 0;
      }
    }

    & > main {
      grid-area: main;
      top: var(--5xl);
      position: relative;
      max-width: ${props => props.showNavigation ? '53.125rem' : '100%'};
      ${props => !props.showNavigation && 'margin: 0 auto;'}
    }

    & > nav {
      grid-area: nav;
      width: 12.5rem;
      top: 4.75rem;
      position: fixed;
      display: ${props => props.showNavigation ? 'block' : 'none'};

      @media(min-width: 768px){
        top: 3.75rem;
        & ul {
          flex-direction: column;
          border-radius: var(--2xs);
          @media (min-width: 768px) {
            border-top-left-radius: 0;
          }
          & li {
            border: 0;
            @media(min-width: 768px){
              border: 1px solid var(--green-50);
            }
          }
        }
      }
    }
  }
`;