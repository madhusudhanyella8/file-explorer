import { createPortal } from "react-dom";
import { TFolder } from "../types/file-explorer";
import { ExplorerProvider } from "./context";
import FolderTree from "./folder-tree";
import ContextMenu from "./context-menu";
import SearchBar from "./search-bar";
import KeyboardShortcuts from "./keyboard-shortcuts";
import "./styles.scss";

export default ({ folder }: { folder: TFolder }) => {
  return (
    <ExplorerProvider>
      <div className="folder-tree">
        <SearchBar />
        <FolderTree folder={folder} id="0" />
      </div>
      {createPortal(<ContextMenu />, document.body)}
      <KeyboardShortcuts />
    </ExplorerProvider>
  );
};
