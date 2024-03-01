import { ReactComponent as FolderIcon } from "../assets/folder.svg";
import { ReactComponent as DownArrowIcon } from "../assets/down-arrow.svg";
import { ReactComponent as RightArrowIcon } from "../assets/right-arrow.svg";
import { useExplorerContext } from "./context";
import { Fragment } from "react";

export default ({
  id,
  name,
  isExpandable,
}: {
  id: string;
  name: string;
  isExpandable: boolean;
}) => {
  const {
    searchText,
    addOrRemoveExpansion,
    expandedIds,
    hoveredId,
    setHoveredId,
  } = useExplorerContext();
  const isExpanded = !!expandedIds[id];
  const isHovered = hoveredId === id;
  const nameSplits = name.split(searchText);

  const ExpandIcon = isExpanded ? DownArrowIcon : RightArrowIcon;

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!isExpandable) {
      return;
    }
    addOrRemoveExpansion(id);
  };

  return (
    <div
      onMouseEnter={() => setHoveredId(id)}
      onMouseLeave={() => setHoveredId("")}
      className={[
        "folder",
        isHovered ? "hovered" : "",
        isExpandable ? "expandable" : "",
      ].join(" ")}
      onClick={handleClick}
      id={id}
    >
      {isExpandable && <ExpandIcon height={12} width={12} />}
      <FolderIcon height={16} width={16} />
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
