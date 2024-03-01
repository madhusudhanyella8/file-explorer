import { useExplorerContext } from "./context";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

export default () => {
  const { searchText, setSearchText } = useExplorerContext();

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search..."
      />
      <SearchIcon height={16} width={16} />
    </div>
  );
};
