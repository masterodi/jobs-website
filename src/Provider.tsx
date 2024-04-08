import { Accessor, Resource, createContext, createResource, createSignal, useContext } from 'solid-js';
import { getSession } from './api/authentication';
import { User } from './types';

type SessionContextProps = {
  session: Resource<User | null>;
  refetch: (info?: unknown) => User | Promise<User | null | undefined> | null | undefined;
};

type MenuDrawerContextProps = {
  isOpen: Accessor<boolean>;
  setOpen: (val: boolean) => void;
  toggle: () => void;
};

const SessionContext = createContext<SessionContextProps>();

export const useSessionContext = () => {
  const ctx = useContext(SessionContext);

  if (!ctx) {
    console.error('useSessionContext must be used inside child of Provider');
    throw new Error('useSessionContext must be used inside child of Provider');
  }

  return ctx;
};

const MenuDrawerContext = createContext<MenuDrawerContextProps>();

export const useMenu = () => {
  const ctx = useContext(MenuDrawerContext);

  if (!ctx) {
    throw new Error('useMenu must be used inside child of Provider');
  }

  return ctx;
};

export const Provider = (props: any) => {
  const [session, { refetch }] = createResource(getSession);
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  return (
    <SessionContext.Provider value={{ session, refetch }}>
      <MenuDrawerContext.Provider
        value={{ isOpen: isMenuOpen, setOpen: setIsMenuOpen, toggle: () => setIsMenuOpen((prev) => !prev) }}
      >
        {props.children}
      </MenuDrawerContext.Provider>
    </SessionContext.Provider>
  );
};
