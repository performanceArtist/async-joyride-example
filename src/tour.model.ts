import { makeTour } from './tour';
import { TourStep } from 'tour/containers/tour.container';
import { makeTourSelector } from './tour/tour.utils';

export type TourStepName = 'one' | 'two' | 'three' | 'four' | 'five';

type CustomOptions = Omit<TourStep, 'target'>;

const getStepWithDefaults = (
  stepName: TourStepName,
  options: CustomOptions,
): TourStep => ({
  ...options,
  target: options.isModal ? 'body' : makeTourSelector(stepName),
  placement: options.isModal ? 'center' : options.placement,
});

const getStepOptions = (stepName: TourStepName): CustomOptions => {
  switch (stepName) {
    case 'one':
      return {
        content: 'One',
        placement: 'bottom',
        disableBeacon: true,
      };
    case 'two':
      return { content: 'Two', placement: 'bottom' };
    case 'three':
      return { content: 'Three', placement: 'bottom' };
    case 'four':
      return { content: 'Four', placement: 'bottom' };
    case 'five':
      return { content: 'End', isModal: true };
  }
};

const getStep = (stepName: TourStepName): TourStep =>
  getStepWithDefaults(stepName, getStepOptions(stepName));

export const tour = makeTour<TourStepName>({
  stepKeys: ['one', 'two', 'three', 'four', 'five'],
  getStep,
});
