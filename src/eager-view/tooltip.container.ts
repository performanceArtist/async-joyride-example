import { withDefaults } from '@performance-artist/react-utils';
import { tour } from '../tour.model';
import { Tooltip } from './tooltip.component';

export const TooltipContainer = withDefaults(Tooltip)({
  onNextStep: () =>
    tour.source.dispatch('setCurrentStepIndex')(
      tour.source.state.get().currentStep.index + 1,
    ),
  onRequestClose: () => tour.source.dispatch('setTourOpen')(false),
});
