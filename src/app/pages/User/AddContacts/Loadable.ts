/**
 *
 * Asynchronously loads the component for AddContacts
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AddContacts = lazyLoad(
  () => import('./index'),
  module => module.AddContacts,
);
