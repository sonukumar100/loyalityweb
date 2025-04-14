/**
 *
 * Asynchronously loads the component for AgentsContact
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RecruitsContact = lazyLoad(
  () => import('./index'),
  module => module.RecruitsContact,
);
