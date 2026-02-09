import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ViewType = "default" | "artsy" | "brutalist";

interface ViewContextType {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  views: { id: ViewType; name: string }[];
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

const VIEWS: { id: ViewType; name: string }[] = [
  { id: "default", name: "Classic" },
  { id: "artsy", name: "Immersive" },
  { id: "brutalist", name: "Brutalist" },
];

export function ViewProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio-view");
      if (stored === "default" || stored === "artsy" || stored === "brutalist") {
        return stored;
      }
    }
    return "default";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-view", currentView);
  }, [currentView]);

  const setView = (view: ViewType) => {
    setCurrentView(view);
  };

  return (
    <ViewContext.Provider value={{ currentView, setView, views: VIEWS }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
}
