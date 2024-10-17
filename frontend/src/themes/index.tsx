import { createGlobalStyle } from "styled-components";
import "typeface-poppins";

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    // color: white;
    font-style: normal;
    text-decoration: none;
    letter-spacing: 0;
    paragraph-spacing: 0;
  }
  .roboto{
    font-family: 'Roboto', sans-serif;
  }

  .medium-100{
    font-weight: 500; 
    font-size: 14px;
    line-height: 24px;
  }
  
  .medium-200{
    font-weight: 500; 
    font-size: 20px;
    line-height: 160%;
  }
  
  .bold-300  {
    font-weight: bold; 
    font-size: 24px;
    line-height: 140%;
  }

  .regular-300 {
    font-weight: normal; 
    font-size: 24px;
    line-height: 140%;
  }
  
  .medium-400{
    font-weight: 500; 
    font-size: 32px;
    line-height: 140%;
  }
  
  .medium-500{
    font-weight: 500;
    font-size: 40px;
    line-height: 140%;
  }
  
  .smallest-regular {
    line-height: 160%;
    font-size: 12px;
  }
  .smallest-regular {
    line-height: 160%;
    font-size: 14px;
  }

  .smaller-bold {
    line-height: 160%;
    font-size: 14px;
    font-weight: bold;
  }

  .small-spaced {
    line-height: 160%;
    font-size: 16px;
  }
  .small-regular {
    line-height: 100%;
    font-size: 16px;
  }

  .big-bold {
    line-height: 160%;
    font-size: 20px;
    font-weight: bold;
  }

  .bigger-bold {
    line-height: automatic;
    font-size: 24px;
    font-weight: bold;
  }

  .biggest-regular {
    line-height: 160%;
    font-size: 32px;
  }

  .giant-bold {
    line-height: automatic;
    font-size: 42px;
    font-weight: bold;
  }

  .bg-home {
    background-color: #192227;
  }

  .bg-light-100 {
    background-color: rgba(255, 255, 255, 1);
  }
  .bg-light-200 {
    background-color: rgba(255,250,241,1);
  }
  .bg-light-300 {
    background-color: rgba(225,225,230,1);
  }
  .bg-light-400 {
    background-color: rgba(196,296,204,1);
  }
  .bg-light-500 {
    background-color: rgba(124,124,138,1);
  }
  .bg-light-600 {
    background-color: rgba(118,121,123,1);
  }
  .bg-light-700 {
    background-color: rgba(77,88,94,1);
  }
  .bg-dark-100 {
    background-color: rgba(0,4,5,1);
  }

  .bg-dark-200 {
    background-color: rgba(0,7,10,1);
  }
  .bg-dark-300 {
    background-color: rgba(0,2,4,1);
  }
  .bg-dark-400 {
    background-color: rgba(0,10,15,1);
  }
  .bg-dark-500 {
    background-color: rgba(0,12,18,1);
  }

  .bg-dark-600 {
    background-color: rgba(0,17,26,1);
  }

  .bg-dark-700 {
    background-color: #001119;
  }

  .bg-dark-800 {
    background-color: rgba(13,22,27,1);
  }

  .bg-dark-900 {
    background-color: rgba(13,29,37,1);
  }

  .bg-dark-1000 {
    background-color: rgba(25,34,39,1);
  }
  .bg-gradient-100 {
    background: linear-gradient(to right, rgba(13,22,27,1), rgba(13,22,27,1));
  }
  .bg-gradient-200 {
    background: linear-gradient(to right, rgba(25,34,39,1), rgba(25,34,39,1));
  }

  .bg-tints-tomato-100 {
    background-color: rgba(117,3,16,1);
  }
  .bg-tints-tomato-200 {
    background-color: rgba(146,0,14,1);
  }
  .bg-tints-tomato-300 {
    background-color: rgba(171,34,46,1);
  }
  .bg-tints-tomato-400 {
    background-color: rgba(171,77,85,1);
  }
  .bg-tints-carrot-100 {
    background-color: rgba(251,169,76,1);
  }
  .bg-tints-mint-100 {
    background-color: rgba(4,211,97,1);
  }
  .bg-tints-cake-100 {
    background-color: rgba(6,94,124,1);
  }
  .bg-tints-cake-200 {
    background-color: rgba(130,243,255,1);
  }

  .text-light-100 {
    color: rgba(255, 255, 255, 1);
  }
  .text-light-200 {
    color: rgba(255,250,241,1);
  }
  .text-light-300 {
    color: rgba(225,225,230,1);
  }
  .text-light-400 {
    color: rgba(196,296,204,1);
  }
  .text-light-500 {
    color: rgba(124,124,138,1);
  }
  .text-light-600 {
    color: rgba(118,121,123,1);
  }
  .text-light-700 {
    color: rgba(77,88,94,1);
  }
  .text-dark-100 {
    color: rgba(0,4,5,1);
  }
  
  .text-dark-200 {
    color: rgba(0,7,10,1);
  }
  .text-dark-300 {
    color: rgba(0,2,4,1);
  }
  .text-dark-400 {
    color: rgba(0,10,15,1);
  }
  .text-dark-500 {
    color: rgba(0,12,18,1);
  }
  
  .text-dark-600 {
    color: rgba(0,17,26,1);
  }
  
  .text-dark-700 {
    color: rgba(0,17,25,1);
  }
  
  .text-dark-800 {
    color: rgba(13,22,27,1);
  }
  
  .text-dark-900 {
    color: rgba(13,29,37,1);
  }
  
  .text-dark-1000 {
    color: rgba(25,34,39,1);
  }
  .text-tints-tomato-100 {
    color: rgba(117,3,16,1);
  }
  .text-tints-tomato-200 {
    color: rgba(146,0,14,1);
  }
  .text-tints-tomato-300 {
    color: rgba(171,34,46,1);
  }
  .text-tints-tomato-400 {
    color: rgba(171,77,85,1);
  }
  .text-tints-carrot-100 {
    color: rgba(251,169,76,1);
  }
  .text-tints-mint-100 {
    color: rgba(4,211,97,1);
  }
  .text-tints-cake-100 {
    color: rgba(6,94,124,1);
  }
  .text-tints-cake-200 {
    color: rgba(130,243,255,1);
  }
`;
