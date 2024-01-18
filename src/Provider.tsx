import { User } from 'firebase/auth';
import { Resource, createContext, createResource, useContext } from 'solid-js';
import { getSession } from './api/authentication';

type SessionContextProps = {
  session: Resource<User | null>;
  refetch: (info?: unknown) => User | Promise<User | null | undefined> | null | undefined;
};

const SessionContext = createContext<SessionContextProps>();

export const Provider = (props: any) => {
  const [session, { refetch }] = createResource(getSession);

  return <SessionContext.Provider value={{ session, refetch }}>{props.children}</SessionContext.Provider>;
};

export const useSessionContext = () => {
  const ctx = useContext(SessionContext);

  if (!ctx) {
    throw new Error('useSessionContext must be used inside child of Provider');
  }

  return ctx;
};
