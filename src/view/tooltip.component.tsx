import React from 'react';
import { TooltipRenderProps } from 'react-joyride';

export const Tooltip = ({
  step,
  tooltipProps,
  onNextStep,
  onRequestClose,
}: TooltipRenderProps & {
  onNextStep: () => void;
  onRequestClose: () => void;
}) => (
  <div
    {...tooltipProps}
    style={{ backgroundColor: 'gainsboro', padding: 20, borderRadius: 10 }}
  >
    <div>{step.content}</div>
    <button onClick={onNextStep}>Next</button>
    <button onClick={onRequestClose}>Close</button>
  </div>
);
