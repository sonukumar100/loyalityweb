/**
 *
 * Asynchronously loads the component for Dasboard
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Dasboard = lazyLoad(
  () => import('./index'),
  module => module.Dasboard,
);
