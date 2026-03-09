import { createGlobalStyle } from 'styled-components';
import {
  media_breakpoint_down,
  media_breakpoint_up,
} from '../mediaBreakpoints.style';
import {
  globalColor,
  globalBorderRadius,
  globalTransition,
  rem,
} from './tokens';
import { customListMarker } from './mixins';

export const GlobalStyle = createGlobalStyle`
  :root {
    --animate-duration: 1s;
  }

  .animate__animated {
    animation-duration: var(--animate-duration);
    animation-fill-mode: both;
  }

  .animate__animated.animate__slow {
    animation-duration: calc(var(--animate-duration) * 2);
  }

  .animate__animated.animate__fast {
    animation-duration: calc(var(--animate-duration) * 0.5);
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .animate__fadeInDown {
    animation-name: fadeInDown;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  .animate__fadeInUp {
    animation-name: fadeInUp;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  * {
    ${media_breakpoint_up('lg')} {
      &::-webkit-scrollbar-track {
        background-color: #cbcbcb;
        border-radius: ${globalBorderRadius.small};
        opacity: 0;
      }

      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
        background-color: #0B1136;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #162153;
        border-radius: ${globalBorderRadius.small};
      }

      @supports not selector(::-webkit-scrollbar-thumb) {
        scrollbar-color: #162153 #cbcbcb;
        scrollbar-width: thin;
      }
    }
  }

  body {
    --bs-body-font-size: ${rem(18)};
    --bs-body-font-family: var(--font-poppins);
    font-weight: 400;
    background-color: ${globalColor.graySmoke.extraLiteWhiteSmoke};

    &.modal-open {
      padding-right: 0 !important;

      .offcanvas-backdrop {
        z-index: 1019;
      }
    }

    .margin-scroll {
      scroll-margin-top: calc(var(--header-height) + 65px);
    }

    &:has(.modal-open),
    &:has(.sidebar-open),
    &:has(.navbar-content) {
      overflow: hidden;
    }

    &:has(.navbar-content) {
      ${media_breakpoint_down('lg')} {
        overflow: unset;
      }
    }

    ${media_breakpoint_down('xxl')} {
      --bs-body-font-size: ${rem(16)};
    }

    ${media_breakpoint_down('md')} {
      --bs-body-font-size: ${rem(14)};
    }

    @media print {
      background-color: ${globalColor.white};
    }
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  main {
    flex: 1;
  }

  a {
    text-decoration: none;
    color: ${globalColor.blue.ultramarine};
    transition: ${globalTransition.default};

    @media(hover:hover) {
      :hover {
        color: ${globalColor.red.darkRed};
      }
    }

    &:active {
      color: ${globalColor.red.darkRed};
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ol {
    padding: 0;
  }

  h1 {
    font-family: var(--font-poppins), sans-serif;
  }

  h2 {
    font-size: ${rem(38)};
    font-weight: 400;
  }

  h3 {
    color: ${globalColor.black};
    font-weight: 700;
    font-size: ${rem(28)};
    margin: 0;
  }

  h4, h5 {
    font-size: ${rem(19.2)};
  }

  h6 {
    font-size: ${rem(18)};
  }

  input {
    border-radius: 0;
    border: 1px solid ${globalColor.grayExtraLite.grayExtraLite100};
    background-color: ${globalColor.graySmoke.liteWhiteSmoke};

    ::placeholder {
      color: ${globalColor.grayExtraLite.grayExtraLite80};
    }

    :active {
      border-color: ${globalColor.blue.ultramarine};
    }

    :focus-visible {
      border: 1px solid ${globalColor.blue.ultramarine};
    }
  }

  video {
    width: -webkit-fill-available;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &[disabled] {
      background-color: ${globalColor.grayLite.grayLite100};
    }
  }

  .content {
    h4 {
      font-weight: bold;
    }

    p {
      font-size: ${rem(18)};
      line-height: 1.7;
    }

    li {
      font-size: ${rem(16)};
    }

    img {
      max-width: 100%;
    }
  }

  .light-scrollbar {
    * {
      &::-webkit-scrollbar-track {
        background-color: ${globalColor.blue.blue6002};
        border-radius: ${globalBorderRadius.small};
        opacity: 0;
      }

      &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${globalColor.blue.blue400};
        border-radius: ${globalBorderRadius.small};
      }

      @supports not selector(::-webkit-scrollbar-thumb) {
        scrollbar-color: ${globalColor.blue.blue400} ${
  globalColor.blue.blue6002
};
        scrollbar-width: thin;
      }
    }
  }

  @media print {
    .grecaptcha-badge {
      display: none !important;
    }
  }

  .kw-border-success {
    margin-left: 0;
  }

  .aligncenter > img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 80%;
    height: 100%;
    object-fit: cover;
  }

  .aligncenter > figcaption {
    text-align: center;
    margin-top: 8px;
    font-size: ${rem(14)};
  }

  .alignleft {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: column;
    float: left;
    margin-right: 24px;
    max-width: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .alignright {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    flex-direction: column;
    float: right;
    margin-left: 24px;
    max-width: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .wp-block-columns {
    display: flex;
  }

  .wp-block-column {
    flex: 1;
  }

  .wp-block-table, .table-wrapper {
    td, th {
      padding: 0 10px;
      border: 1px solid ${globalColor.grayExtraLite.grayExtraLite100};
    }
  }

  .has-text-align-center {
    text-align: center;
  }

  .wrapper-section {
    width: 1650px;
    max-width: 96%;
    margin: 0 auto 150px;
  }

  footer .wrapper-section {
    margin-bottom: 0;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  @media (max-width: 992px) {
    .wp-block-columns {
      display: block;
    }
  }

  @media (min-width: 576px) {
    .container {
      max-width: 90%;
    }
  }

  @media (min-width: 768px) {
    .container {
      max-width: 96%;
    }
  }

  @media (min-width: 1200px) {
    .container {
      max-width: 1440px;
      padding: 0 5%;
    }
  }

  @media only screen and (max-width: 768px) {
    .modal-dialog {
      margin: 0;
    }

    .modal-content {
      width: 90%;
      margin: 0 auto;
    }

    .wrapper-section {
      margin: 0 auto 70px;
    }
  }

  .tag-two::before {
    content: ' - ';
  }

  .text-list {
    list-style: disc;

    > li {
      ${customListMarker};

      &::marker {
        color: currentColor;
      }
    }
  }

  .numbers-list {
    li {
      margin-left: 24px;
    }
  }
`;
