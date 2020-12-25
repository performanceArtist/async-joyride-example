import { selector } from '@performance-artist/fp-ts-adt';
import { pipe } from 'fp-ts/lib/pipeable';
import React from 'react';
import { LayoutContainer } from './view/layout.container';

export const App = pipe(
  LayoutContainer,
  selector.map(LayoutContainer => () => (
    <div>
      <LayoutContainer />
    </div>
  )),
);
