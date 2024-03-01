import { ReactComponent as FileIcon } from "../assets/file.svg";
import { useExplorerContext } from "./context";
import { Fragment } from "react";

export default ({ id, name }: { id: string; name: string }) => {
  const {
    replaceSelection,
    selectedIds,
    hoveredId,
    setHoveredId,
    setContextMenu,
    searchText,
  } = useExplorerContext();
  const isSelected = !!selectedIds[id];
  const isHovered = hoveredId === id;
  const nameSplits = name.split(searchText);

  const handleClick = (e?: any) => {
    e?.stopPropagation();
    replaceSelection(id);
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    if (!isSelected) {
      handleClick();
    }
    setContextMenu({ left: e.pageX, top: e.pageY });
  };

  return (
    <div
      data-type="file"
      onMouseEnter={() => setHoveredId(id)}
      onMouseLeave={() => setHoveredId("")}
      id={id}
      className={[
        "file",
        isSelected ? "selected" : "",
        isHovered ? "hovered" : "",
      ].join(" ")}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <FileIcon height={16} width={16} />
      <span className="name">
        {nameSplits.map((s, idx) => {
          if (idx === nameSplits.length - 1) {
            return <span key={idx}>{s}</span>;
          }
          return (
            <Fragment key={idx}>
              <span>{s}</span>
              {searchText && <span className="highlight">{searchText}</span>}
            </Fragment>
          );
        })}
      </span>
    </div>
  );
};
