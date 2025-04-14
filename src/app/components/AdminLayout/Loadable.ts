/**
 *
 * Asynchronously loads the component for AdminLayout
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AdminLayout = lazyLoad(
  () => import('./index'),
  module => module.AdminLayout,
);
