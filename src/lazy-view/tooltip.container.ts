import { selector } from '@performance-artist/fp-ts-adt';
import { withHook } from '@performance-artist/react-utils';
import { pipe } from 'fp-ts/lib/pipeable';
import { TourSource } from '@performance-artist/async-joyride/dist/tour.source';
import { TourStepName } from '../tour.model';
import { Tooltip } from './tooltip.component';

type Deps = {
  tourSource: TourSource<TourStepName>;
};

export const TooltipContainer = pipe(
  selector.keys<Deps>()('tourSource'),
  selector.map(deps =>
    withHook(Tooltip)(() => {
      const { tourSource } = deps;

      return {
        onNextStep: () =>
          tourSource.dispatch('setCurrentStepIndex')(
            tourSource.state.get().currentStep.index + 1,
          ),
        onRequestClose: () => tourSource.dispatch('setTourOpen')(false),
      };
    }),
  ),
);
