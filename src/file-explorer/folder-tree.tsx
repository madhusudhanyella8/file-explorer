import { TFolder } from "../types/file-explorer";
import { useExplorerContext } from "./context";
import File from "./file";
import Folder from "./folder";

const FolderTree = ({ folder, id }: { folder: TFolder; id: string }) => {
  const { expandedIds } = useExplorerContext();
  const isExpanded = !!expandedIds[id];
  return (
    <div className="folder-container">
      <Folder id={id} name={folder.name} isExpandable={!!folder.data?.length} />
      {isExpanded && (
        <div className="expanded-content">
          {folder?.data?.map((data, idx) => {
            if (data.type === "folder") {
              return (
                <FolderTree key={data.name} folder={data} id={`${id}.${idx}`} />
              );
            }
            if (data.type === "file") {
              return (
                <File key={data.name} id={`${id}.${idx}`} name={data.name} />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default FolderTree;
