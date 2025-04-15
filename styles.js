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
  --red-500: #fa3b3b;

  --lightgray:#fffefe;
  --darkgray:#4f4949;

  --green-50: #ebfef4;
  --green-100: #cefde2;
  --green-200: #a2f8cb;
  --green-300: #66efb1;
  --green-400: #29de92;
  --green-500: #05c47a;
  --green-600: #00a064;
  --green-700: #008053;
  --green-800: #006241;
  --green-900: #015338;
  --green-950: #002f20;

  --green-text-light: #ebfef4;
  --green-text-dark: #002f20;

  /* distances */
  --4xs: 0.125rem;  /* 2px */
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
  --5xl: 2.5rem;    /* 40px */

/* generals */
  --bgBody: var(--green-50);
  --bgHeader: var(--green-600);
  --headerColor: var(--green-text-light);

  /* global usages */
  --box-shadow-default: 0 0 0 1px #d2d2d5, 
                      0 10px 15px -3px rgba(0, 0, 0, 0.05),
                      0 4px 6px -4px rgba(0, 0, 0, 0.05);

  --box-shadow-active: 5px 5px 22px -4px #002f20,
                      5px 5px 22px -4px rgba(0, 0, 0, 0.6),
                      0 4px 6px -4px rgba(0, 0, 0, 0.05);
}

  html { 
    font-size: 100%;
    line-height: 1.15;
  } 

  h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}

ul, ol {
  list-style: none;
}

  body {
    margin: 0;
    font-family: system-ui;
    width:100%;
    max-width: 27rem;
    margin-left:auto;
    margin-right:auto;
    background-color: var(--bgBody);
  }

  main {
    padding: 0 var(--xs);
    margin-top: 5.5rem;
    padding-bottom: 5rem;
  }

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  input[type=number] {
    -moz-appearance: textfield;
    -webkit-appearance: none;
    appearance: none; 
  }
}

a {
  all: unset;
}

`;
