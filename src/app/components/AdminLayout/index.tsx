/**
 *
 * AdminLayout
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AdminLayout = memo((props: Props) => {
  return (
    <React.Fragment>
      <div>
        <Header />
      </div>

      <div className="">
        <div className="bg-admin min-h-[100vh]">
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6">{props.children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});
