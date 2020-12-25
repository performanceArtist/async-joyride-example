import React, { memo, useState } from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import { tour, TourStepName } from '../tour.model';
import {
  requestResult,
  RequestResult,
  selector,
} from '@performance-artist/fp-ts-adt';
import { TooltipContainer } from './tooltip.container';
import { RequestStateRenderer } from '@performance-artist/react-utils';
import { NO_STEP } from '../tour/components/tour-target.component';

type LayoutProps = {
  onTourStart: () => void;
};

export const Layout = pipe(
  selector.combine(tour.TourTarget, tour.TourContainer, TooltipContainer),
  selector.map(([TourTarget, TourContainer, TooltipContainer]) =>
    memo<LayoutProps>(props => {
      const { onTourStart } = props;

      const [mockData, setMockData] = useState<RequestResult<string>>(
        requestResult.initial,
      );

      const renderItem = (content: string, step?: TourStepName) => (
        <TourTarget stepName={step || NO_STEP}>
          {({ tourSelector }) => (
            <h2 {...tourSelector} style={{ backgroundColor: 'purple' }}>
              {content}
            </h2>
          )}
        </TourTarget>
      );

      return (
        <div>
          <button onClick={onTourStart}>Start tour</button>
          <TourContainer
            continuous
            tooltipComponent={TooltipContainer}
            spotlightPadding={0}
          />
          <TourTarget stepName="one">
            {({ tourSelector }) => (
              <h2 {...tourSelector} style={{ backgroundColor: 'red' }}>
                1
              </h2>
            )}
          </TourTarget>
          <RequestStateRenderer
            data={mockData}
            onInitial={() => (
              <button
                onClick={() => setMockData(requestResult.success('DATA'))}
              >
                Click to load data for the second step
              </button>
            )}
            onPending={() => <div>Loading...</div>}
            onError={() => <div>Error</div>}
            onSuccess={data => (
              <TourTarget stepName="two">
                {({ tourSelector }) => (
                  <h2 {...tourSelector} style={{ backgroundColor: 'green' }}>
                    Data: {data}
                  </h2>
                )}
              </TourTarget>
            )}
          />

          <TourTarget stepName="three">
            {({ tourSelector, state, dispatch }) => (
              <h2 {...tourSelector} style={{ backgroundColor: 'blue' }}>
                3
                {state.currentStep.key === 'three' && (
                  <button
                    onClick={() =>
                      dispatch('setCurrentStepIndex')(
                        state.currentStep.index - 1,
                      )
                    }
                  >
                    Go back
                  </button>
                )}
              </h2>
            )}
          </TourTarget>
          {renderItem('Not a target')}
          {renderItem('4', 'four')}
        </div>
      );
    }),
  ),
);
