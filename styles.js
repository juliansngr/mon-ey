import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* colors */
  --color-dark: #111111;
  --color-light: #eeeeee;
  --red-500: #ff0000;

  --lightgray:#fffefe;
  --darkgray:#4f4949;

  --green-50: #f0fdf4;
  --green-100: #dcfce7;
  --green-200: #bbf7d0;
  --green-300: #86efac;
  --green-400: #4ade80;
  --green-500: #22c55e;
  --green-600: #16a34a;
  --green-700: #15803d;
  --green-800: #166534;
  --green-900: #14532d;

  --green-text-light: #fff;
  --green-text-dark: #002f20;

  /* distances */
  --3xs: 0.25rem;  /* 4px */
  --2xs: 0.5rem;   /* 8px */
  --xs: 0.625rem;  /* 10px */
  --sm: 0.75rem;   /* 12px */
  --md: 0.875rem;  /* 14px */
  --base: 1rem;    /* 16px */
  --lg: 1.125rem;  /* 18px */
  --xl: 1.25rem;   /* 20px */
  --2xl: 1.5rem;   /* 24px */
  --3xl: 1.875rem; /* 30px */
  --4xl: 2rem;     /* 32px */

/* generals */
  --bgBody: var(--lightgray);
  --bgHeader: var(--green-800);
  --headerColor: var(--green-text-light);
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
    max-width: 27rem;
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
  header {
    background-color: var(--bgHeader);
    color: var(--headerColor);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  main{
    padding: 0 var(--xs);
  }
`;
