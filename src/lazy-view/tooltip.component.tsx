import React from 'react';
import { TooltipRenderProps } from 'react-joyride';

type TooltipProps = TooltipRenderProps & {
  onNextStep: () => void;
  onRequestClose: () => void;
};

export const Tooltip = (props: TooltipProps) => {
  const { step, tooltipProps, onNextStep, onRequestClose, isLastStep } = props;

  return (
    <div
      {...tooltipProps}
      style={{ backgroundColor: 'gainsboro', padding: 20, borderRadius: 10 }}
    >
      <div>{step.content}</div>
      {!isLastStep && <button onClick={onNextStep}>Next</button>}
      <button onClick={onRequestClose}>Close</button>
    </div>
  );
};
