import { selector } from '@performance-artist/fp-ts-adt';
import { medium } from '@performance-artist/medium';
import { useSubscription } from '@performance-artist/react-utils';
import { pipe } from 'fp-ts/lib/pipeable';
import { createElement, memo, useCallback, useMemo } from 'react';
import { tour } from '../tour.model';
import { Layout } from './layout.component';

export const LayoutContainer = pipe(
  selector.defer(Layout, 'tourSource'),
  selector.map(Layout =>
    memo(() => {
      const tourSource = useMemo(tour.source, []);
      const tourMedium = useMemo(() => tour.medium.run({ tourSource }), [
        tourSource,
      ]);
      useSubscription(() => medium.subscribe(tourMedium), [tourMedium]);

      const Component = useMemo(() => Layout.run({ tourSource }), [tourSource]);

      const onTourStart = useCallback(
        () => tourSource.dispatch('setTourOpen')(true),
        [tourSource],
      );

      return createElement(Component, { onTourStart });
    }),
  ),
);
