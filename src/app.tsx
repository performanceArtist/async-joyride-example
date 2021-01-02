import React from 'react';
import { LayoutContainer as EagerLayout } from './eager-view/layout.container';
import { LayoutContainer as LazyLayout } from './lazy-view/layout.container';

export const App = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <div style={{ width: '40%' }}>
      <h2>Eager</h2>
      <EagerLayout />
    </div>
    <div style={{ width: '40%' }}>
      <h2>Lazy</h2>
      <LazyLayout />
    </div>
  </div>
);
