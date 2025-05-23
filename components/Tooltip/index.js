import { useState } from "react";
import styled from "styled-components";

export default function Tooltip({ text, onClick }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  // Interrupt event propagation, otherwise the link will be triggered
  const handleTooltipClick = (event) => {
    event.preventDefault(); // Prevents the default action
    event.stopPropagation(); // Stops event propagation to the link
    setIsVisible(!isVisible);
  };

  return (
    <TooltipWrapper>
      <TooltipIcon
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTooltipClick}
        aria-label="Tooltip trigger"
      >
        ?
      </TooltipIcon>
      {isVisible && <TooltipBox>{text}</TooltipBox>}
    </TooltipWrapper>
  );
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 0.25rem;
`;

const TooltipIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  background-color: var(--green-500);
  color: var(--green-50);
  border-radius: 50%;
  font-size: var(--xs);
  font-weight: 900;
  cursor: pointer;
  user-select: none;
  vertical-align: top;
  position: relative;

  &:hover {
    background-color: var(--green-600);
  }
`;

const TooltipBox = styled.div`
  position: absolute;
  bottom: 125%; /* Position above the icon */
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--darkgray);
  color: var(--lightgray);
  padding: var(--2xs) var(--xs);
  border-radius: var(--xs);
  font-size: var(--xs);
  box-shadow: var(--box-shadow-default);
  z-index: 100;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  width: 9.75rem;
  @media (min-width: 768px) {
    width: 15.75rem;
  }

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: var(--3xs);
    border-style: solid;
    border-color: var(--darkgray) transparent transparent transparent;
  }
`;
