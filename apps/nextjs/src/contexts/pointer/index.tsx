import { createContext, ReactNode, useContext } from "react";
import { api, RouterOutputs } from "~/utils/api";

type PointersContextType = {
  predefinetions: RouterOutputs["pointerMap"]["all"] | undefined;
  refetch: () => void;
  error: any;
};

export const PointersContext = createContext<PointersContextType>(
  {} as PointersContextType,
);

export const PointersProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: predefinetions,
    refetch,
    error,
  } = api.pointerMap.all.useQuery();

  return (
    <PointersContext.Provider value={{ predefinetions, refetch, error }}>
      {children}
    </PointersContext.Provider>
  );
};

export function usePointers() {
  return useContext<PointersContextType>(PointersContext);
}
