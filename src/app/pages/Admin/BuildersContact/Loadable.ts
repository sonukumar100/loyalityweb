/**
 *
 * Asynchronously loads the component for AgentsContact
 *
 */

import { lazyLoad } from 'utils/loadable';

export const BuildersContact = lazyLoad(
  () => import('./index'),
  module => module.BuildersContact,
);
