/**
 *
 * Asynchronously loads the component for AgentsContact
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AgentsContact = lazyLoad(
  () => import('./index'),
  module => module.AgentsContact,
);
