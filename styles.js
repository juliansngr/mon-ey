import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  html { 
    font-size: 100%;
    line-height: 1.15;
  } 

  body {
    margin: 0;
    font-family: system-ui;

    width:100%;
    padding: 0 1rem;
    max-width: 400px;
    margin-left:auto;
    margin-right:auto;
  }

  .layout-wrapper {
    display: grid;
 
    grid-template-columns: 1fr;
    grid-template-rows: 3rem 1fr;
    grid-template-areas: "Header" "Main";
    min-height: 100vh;
  }



`;
