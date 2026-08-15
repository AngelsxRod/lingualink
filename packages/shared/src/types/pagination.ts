export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

/** Ayuda a construir respuestas paginadas con una clave de items específica por recurso. */
export type Paginated<T, ItemsKey extends string = "items"> = PaginationMeta & {
  [K in ItemsKey]: T[];
};
