import * as React from 'react';
import { render } from '@testing-library/react';

import { Dasboard } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
}));

describe('<Dasboard  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Dasboard />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
