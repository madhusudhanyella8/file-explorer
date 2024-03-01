export type TFile = {
  type: "file";
  name: string;
  meta: string;
};

export type TFolder = {
  type: "folder";
  name: string;
  data?: (TFile | TFolder)[];
};
