import {
  makeEagerTour,
  makeLazyTour,
  TourConfigStep,
} from '@performance-artist/async-joyride';

type TourSteps = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];

export type TourStepName = TourSteps[number];

export const stepKeys: TourSteps = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
];

const getStepOptions = (stepName: TourStepName): TourConfigStep => {
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
      return { content: 'Five', placement: 'bottom' };
    case 'six':
      return { content: 'Six', placement: 'bottom' };
    case 'seven':
      return { content: 'End', isModal: true, placement: 'center' };
  }
};

const getStep = (stepName: TourStepName): TourConfigStep =>
  getStepOptions(stepName);

export const tour = makeEagerTour<TourStepName>({
  id: 'tour',
  stepKeys,
  getStep,
});

export const lazyTour = makeLazyTour<TourStepName>({
  id: 'lazyTour',
  stepKeys,
  getStep,
});
