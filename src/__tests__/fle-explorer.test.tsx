import { fireEvent, render } from "@testing-library/react";
import FileExplorer from "../file-explorer";

test("file-explorer - folder count", () => {
  const { container } = render(
    <FileExplorer folder={{ name: "test", type: "folder" }} />
  );
  const folders = container.getElementsByClassName("folder");
  expect(folders.length).toBe(1);
});

test("file-explorer - folder features", () => {
  const { container } = render(
    <FileExplorer
      folder={{
        name: "test",
        type: "folder",
        data: [{ type: "file", name: "read.txt", meta: "txt" }],
      }}
    />
  );
  const filesBeforeExpansion = container.getElementsByClassName("file");
  expect(filesBeforeExpansion.length).toBe(0);
  const [folder] = Array.from(container.getElementsByClassName("folder"));
  fireEvent.mouseEnter(folder);
  expect(Array.from(folder.classList).includes("hovered")).toBeTruthy();
  fireEvent.click(folder);
  const filesAfterExpansion = container.getElementsByClassName("file");
  expect(filesAfterExpansion.length).toBe(1);
  fireEvent.click(folder);
  const filesAfterCollapse = container.getElementsByClassName("file");
  expect(filesAfterCollapse.length).toBe(0);
});

test("file-explorer - file features", () => {
  const { container } = render(
    <FileExplorer
      folder={{
        name: "test",
        type: "folder",
        data: [{ type: "file", name: "read.txt", meta: "txt" }],
      }}
    />
  );
  const filesBeforeExpansion = container.getElementsByClassName("file");
  expect(filesBeforeExpansion.length).toBe(0);
  const [folder] = Array.from(container.getElementsByClassName("folder"));
  fireEvent.click(folder);
  const [file] = Array.from(container.getElementsByClassName("file"));
  fireEvent.mouseEnter(file);
  expect(Array.from(file.classList).includes("hovered")).toBeTruthy();
  fireEvent.click(file);
  expect(Array.from(file.classList).includes("selected")).toBeTruthy();
});

test("file-explorer - search", () => {
  const { container } = render(
    <FileExplorer
      folder={{
        name: "test",
        type: "folder",
        data: [{ type: "file", name: "read.txt", meta: "txt" }],
      }}
    />
  );
  const seachInput = container.querySelector(".search-input");
  fireEvent.change(seachInput!, {
    target: { value: "t" },
  });
  const searchHighlightsBeforeExpansion = Array.from(
    container.querySelectorAll(".name .highlight")
  );
  expect(searchHighlightsBeforeExpansion.length).toBe(2);
  const [folder] = Array.from(container.getElementsByClassName("folder"));
  fireEvent.click(folder);
  const searchHighlightsAfterExpansion = Array.from(
    container.querySelectorAll(".name .highlight")
  );
  expect(searchHighlightsAfterExpansion.length).toBe(4);
});
