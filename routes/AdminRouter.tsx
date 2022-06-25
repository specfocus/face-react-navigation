import { useInRouterContext } from '../routes/Router';
import { createHashHistory, History } from 'history';
import React, { ReactNode, useMemo } from 'react';
import { BasenameContextProvider } from './BasenameContextProvider';
import { HistoryRouter, HistoryRouterProps } from './HistoryRouter';

/**
 * Creates a react-router Router unless the app is already inside existing router.
 * Also creates a BasenameContext with the basename prop
 */
export const AdminRouter = ({
  history,
  basename = '',
  children,
}: AdminRouterProps) => {
  const isInRouter = useInRouterContext();
  const Router = isInRouter ? DummyRouter : InternalRouter;

  return (
    <BasenameContextProvider basename={isInRouter ? basename : ''}>
      <Router basename={basename} history={history}>
        {children}
      </Router>
    </BasenameContextProvider>
  );
};

export interface AdminRouterProps {
  history?: History;
  basename?: string;
  children: React.ReactNode;
}

const DummyRouter = ({ children }: { children: ReactNode; }) => <>{children}</>;

const InternalRouter = ({
  children,
  history,
}: {
  history?: History;
} & Omit<HistoryRouterProps, 'history'>) => {
  const finalHistory = useMemo(() => history || createHashHistory(), [
    history,
  ]);

  return <HistoryRouter history={finalHistory}>{children}</HistoryRouter>;
};
