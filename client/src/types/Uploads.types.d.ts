export interface Files {
  id: number;
  path: string;
  nameFile: string;
  nameFileSlice?: string;
  typeFile: string;
  sizeFile?: {
    large?: string;
    small?: string;
    medium?: string;
    original?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface FileStorage {
  image: Files[];
  docs: Files[];
  zips: Files[];
}

export interface OutletContext {
  getFiles(): void;
  typeFileAccept: { accept: string; type: string };
  fileStorage: FileStorage;
  setLoading(boolean): void;
  deleteFile(number): Promise;
}
