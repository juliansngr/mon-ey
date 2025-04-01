import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

  html { 
    font-size: 100%;
    line-height: 1.15;
  } 

  h1, h2, h3, h4, h5, h6 {
  font-size: inherit; /* Verhindert unerwartete Größen */
  font-weight: inherit;
}

ul, ol {
  list-style: none; /* Entfernt Standard-Punkte */
}

  body {
    margin: 0;
    font-family: system-ui;

    width:100%;
    padding: 0 1rem;
    max-width: 400px;
    margin-left:auto;
    margin-right:auto;

    background-color: #ebfef4;
  }

  .layout-wrapper {
    display: grid;
 
    grid-template-columns: 1fr;
    grid-template-rows: 3rem 1fr;
    grid-template-areas: "Header" "Main";
    min-height: 100vh;
  }



`;
