import { createContext, ReactNode, useContext, useState } from "react";

const ExplorerContext = createContext<{
  searchText: string;
  setSearchText: (s: string) => void;
  expandedIds: { [id: string]: boolean };
  selectedIds: { [id: string]: boolean };
  addOrRemoveExpansion: (id: string) => void;
  addOrRemoveSelection: (id: string) => void;
  replaceSelection: (id: string) => void;
  contextMenu?: { left: number; top: number };
  setContextMenu: (c?: { left: number; top: number }) => void;
  hoveredId: string;
  setHoveredId: (id: string) => void;
}>({
  searchText: "",
  setSearchText: () => null,
  hoveredId: "",
  setHoveredId: () => null,
  setContextMenu: () => null,
  contextMenu: undefined,
  expandedIds: {},
  selectedIds: {},
  addOrRemoveExpansion: () => null,
  addOrRemoveSelection: () => null,
  replaceSelection: () => null,
});

export const ExplorerProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [expandedIds, setExpandedIds] = useState<{ [id: string]: boolean }>({});
  const [hoveredId, setHoveredId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<{ [id: string]: boolean }>({});
  const [contextMenu, setContextMenu] = useState<
    { left: number; top: number } | undefined
  >();

  const addOrRemoveExpansion = (id: string) => {
    setExpandedIds((prevVal) => ({ ...prevVal, [id]: !prevVal[id] }));
  };

  const addOrRemoveSelection = (id: string) => {
    setSelectedIds((prevVal) => ({ ...prevVal, [id]: !prevVal[id] }));
  };

  const replaceSelection = (id: string) => {
    setSelectedIds({ [id]: true });
  };

  return (
    <ExplorerContext.Provider
      value={{
        searchText,
        setSearchText,
        hoveredId,
        setHoveredId,
        expandedIds,
        selectedIds,
        addOrRemoveExpansion,
        addOrRemoveSelection,
        replaceSelection,
        setContextMenu,
        contextMenu,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorerContext = () => {
  return useContext(ExplorerContext);
};
