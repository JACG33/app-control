export interface Data {
  id_user: string;
  nombre_usuario: string;
  nombre: string;
  apellido: string;
  Role: {
    role_name: string;
  };
}

export interface Pagination {
  firstPage?: string;
  prevPage?: string;
  nextPage?: string;
  lastPage?: string;
  baseUrl?: string;
  limit?: number;
  totalRecords?: number;
  totalPage?: number;
  currentNumberPage?: number;
}

export interface ResData {
  body?: Data[];
  message?: string;
  pagination?: Pagination;
  error?: string;
}

export interface DataToTabla {
  data: Data[];
  pagination: Pagination;
}

export interface TableComp {
  body: Data[];
  pagination: Pagination;
  header: string[];
  hldEdit(id: string): void;
  hldDelete(id: string): void;
}
