import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  flex-wrap: wrap;
  /* gap: 50px; */
`;

export const Form = styled.div`
  width: 300px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #ef98ea;
`;

export const Header = styled.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  font-weight: bold;
`;

export const ImageHeader = styled.div`
  position: absolute;
  left: -30px;
  top: -30px;
  animation: rotateAnimation 2s infinite linear;
  z-index: 99;
  @keyframes rotateAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ButtonAnimation = styled.button`
  padding: 0.6em 2em;
  ${(props) =>
    css`
      font-size: ${props.size};
    `}
  font-weight: bold;
  border: none;
  outline: none;
  color: black;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &::before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-button-85 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  @keyframes glowing-button-85 {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
  &::after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    /* background: #222; */
    left: 0;
    top: 0;
    border-radius: 10px;
  }
`;
