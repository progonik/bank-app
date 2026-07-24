"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface NavbarActionsContextValue {
  actions: ReactNode;
  setActions: (actions: ReactNode) => void;
}

const NavbarActionsContext = createContext<NavbarActionsContextValue | null>(
  null
);

export function NavbarActionsProvider({ children }: { children: ReactNode }) {
  const [actions, setActionsState] = useState<ReactNode>(null);

  const setActions = useCallback((node: ReactNode) => {
    setActionsState(node);
  }, []);

  return (
    <NavbarActionsContext.Provider value={{ actions, setActions }}>
      {children}
    </NavbarActionsContext.Provider>
  );
}

export function useNavbarActions() {
  const ctx = useContext(NavbarActionsContext);
  if (!ctx) {
    return { actions: null, setActions: () => {} };
  }
  return ctx;
}
