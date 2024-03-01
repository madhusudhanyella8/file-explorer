import { useEffect } from "react";
import { useExplorerContext } from "./context";

export default () => {
  const { contextMenu, setContextMenu } = useExplorerContext();

  const hideContextMenu = () => {
    setContextMenu(undefined);
  };

  useEffect(() => {
    window.addEventListener("click", hideContextMenu);
    return () => {
      window.removeEventListener("click", hideContextMenu);
    };
  }, []);

  if (!contextMenu) {
    return null;
  }

  return (
    <div
      className="context-menu"
      style={{ left: contextMenu.left, top: contextMenu.top }}
    >
      <span className="action">Copy</span>
      <span className="action">Delete</span>
      <span className="action">Rename</span>
    </div>
  );
};
