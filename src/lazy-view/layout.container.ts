import { medium } from '@performance-artist/medium';
import { useSubscription } from '@performance-artist/react-utils';
import { createElement, memo, useCallback, useMemo } from 'react';
import { lazyTour } from '../tour.model';
import { Layout } from './layout.component';

export const LayoutContainer = memo(() => {
  const tourSource = useMemo(lazyTour.source, []);
  const tourMedium = useMemo(() => lazyTour.medium.run({ tourSource }), [
    tourSource,
  ]);
  useSubscription(() => medium.subscribe(tourMedium), [tourMedium]);

  const Component = useMemo(() => Layout.run({ tourSource }), [tourSource]);

  const onTourStart = useCallback(
    () => tourSource.dispatch('setTourOpen')(true),
    [tourSource],
  );

  return createElement(Component, { onTourStart });
});
