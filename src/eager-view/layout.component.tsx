import React, { memo, useState } from 'react';
import { tour, TourStepName } from '../tour.model';
import { requestResult, RequestResult } from '@performance-artist/fp-ts-adt';
import { TooltipContainer } from './tooltip.container';
import { RequestStateRenderer } from '@performance-artist/react-utils';
import { NO_STEP } from '@performance-artist/async-joyride/dist/hooks/useTour';

type LayoutProps = {
  onTourStart: () => void;
};

const { TourContainer, TourWrapper, TourArea } = tour;

export const Layout = memo<LayoutProps>(props => {
  const { onTourStart } = props;

  const [mockData, setMockData] = useState<RequestResult<string>>(
    requestResult.initial,
  );

  const renderItem = (content: string, step?: TourStepName) => (
    <TourWrapper stepKey={step || NO_STEP}>
      {({ tourProps }) => (
        <h2 {...tourProps} style={{ backgroundColor: 'purple' }}>
          {content}
        </h2>
      )}
    </TourWrapper>
  );

  return (
    <div>
      <button onClick={onTourStart}>Start tour</button>
      <TourContainer
        continuous
        tooltipComponent={TooltipContainer}
        spotlightPadding={0}
        spotlightClicks
      />
      <TourWrapper stepKey="one">
        {({ tourProps }) => (
          <h2 {...tourProps} style={{ backgroundColor: 'red' }}>
            1
          </h2>
        )}
      </TourWrapper>
      <RequestStateRenderer
        data={mockData}
        onInitial={() => (
          <button onClick={() => setMockData(requestResult.success('DATA'))}>
            Click to load data for the second step
          </button>
        )}
        onPending={() => <div>Loading...</div>}
        onError={() => <div>Error</div>}
        onSuccess={data => (
          <TourWrapper stepKey="two">
            {({ tourProps }) => (
              <h2 {...tourProps} style={{ backgroundColor: 'green' }}>
                Data: {data}
              </h2>
            )}
          </TourWrapper>
        )}
      />
      <TourWrapper stepKey="three">
        {({ tourProps, state, dispatch, isActive }) => (
          <h2 {...tourProps} style={{ backgroundColor: 'blue' }}>
            3
            {isActive && (
              <button
                onClick={() =>
                  dispatch('setCurrentStepIndex')(state.currentStep.index - 1)
                }
              >
                Go back
              </button>
            )}
          </h2>
        )}
      </TourWrapper>
      {renderItem('Not a target')}
      {renderItem('4', 'four')}
      <h2
        style={{
          backgroundColor: 'yellow',
          position: 'relative',
          paddingLeft: 50,
        }}
      >
        <TourArea stepKey="five" width={55} height="100%" left={30} />5
      </h2>
      <TourWrapper stepKey="six">
        {({ tourProps, isActive }) => (
          <div
            style={{
              backgroundColor: 'wheat',
              padding: 10,
              display: 'flex',
              pointerEvents: isActive ? 'none' : 'auto',
            }}
            {...tourProps}
          >
            <button onClick={() => alert('click')}>Disabled during tour</button>
            <button
              onClick={() => alert('click')}
              style={{ pointerEvents: 'auto' }}
            >
              Enabled during tour
            </button>
          </div>
        )}
      </TourWrapper>
    </div>
  );
});
