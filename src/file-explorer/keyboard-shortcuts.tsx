import { useEffect } from "react";
import { useExplorerContext } from "./context";

enum KeyCodes {
  Up = 38,
  Down = 40,
  Enter = 13,
  Esc = 27,
  C = 67,
  Space = 32,
}

const getVisibleIds = () => {
  const allNodes = Array.from(document.querySelectorAll(".file,.folder"));
  const allIds = allNodes.map((n) => n.id);
  return allIds;
};

const getHoveredNodeInfo = () => {
  const hoveredNode = document.querySelector(".file.hovered,.folder.hovered");
  if (!hoveredNode) {
    return;
  }
  const box = hoveredNode.getBoundingClientRect();
  return {
    id: hoveredNode.id,
    left: box.x + box.width / 2,
    top: box.y + box.height / 2,
    type: hoveredNode.classList.contains("folder") ? "folder" : "file",
    isExpandable:
      hoveredNode.classList.contains("folder") &&
      hoveredNode.classList.contains("expandable"),
  };
};

export default () => {
  const {
    setHoveredId,
    addOrRemoveExpansion,
    setContextMenu,
    replaceSelection,
  } = useExplorerContext();

  const handleKeyUp = (e: any) => {
    switch (e.keyCode) {
      case KeyCodes.Up:
      case KeyCodes.Down: {
        const allIds = getVisibleIds();
        const hoveredNodeInfo = getHoveredNodeInfo();
        if (hoveredNodeInfo) {
          const hoveredNodeIndex = allIds.indexOf(hoveredNodeInfo.id);
          const newId =
            allIds[hoveredNodeIndex + (e.keyCode === KeyCodes.Up ? -1 : 1)];
          if (newId) {
            setHoveredId(newId);
          }
        } else {
          setHoveredId("0");
        }
        return;
      }
      case KeyCodes.Enter: {
        const hoveredNodeInfo = getHoveredNodeInfo();
        if (
          hoveredNodeInfo?.type === "folder" &&
          !!hoveredNodeInfo?.isExpandable
        ) {
          addOrRemoveExpansion(hoveredNodeInfo.id);
        }
        return;
      }
      case KeyCodes.Space: {
        const hoveredNodeInfo = getHoveredNodeInfo();
        if (hoveredNodeInfo?.type === "file") {
          replaceSelection(hoveredNodeInfo.id);
        }
        return;
      }
      case KeyCodes.Esc: {
        setContextMenu(undefined);
        return;
      }
      case KeyCodes.C: {
        const hoveredNodeInfo = getHoveredNodeInfo();
        if (hoveredNodeInfo?.type === "file") {
          replaceSelection(hoveredNodeInfo.id);
          setContextMenu({
            left: hoveredNodeInfo.left,
            top: hoveredNodeInfo.top,
          });
        }
        return;
      }
      default:
        return;
    }
  };

  const handleWindowClick = () => {
    setHoveredId("");
    replaceSelection("");
  };

  useEffect(() => {
    document.body.addEventListener("keyup", handleKeyUp);
    window.addEventListener("click", handleWindowClick);
    return () => {
      document.body.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return null;
};
