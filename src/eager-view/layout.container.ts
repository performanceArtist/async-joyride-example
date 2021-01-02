import { withDefaults } from '@performance-artist/react-utils';
import { tour } from '../tour.model';
import { Layout } from './layout.component';

export const LayoutContainer = withDefaults(Layout)({
  onTourStart: () => tour.source.dispatch('setTourOpen')(true),
});
