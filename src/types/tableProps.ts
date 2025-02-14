import { Column } from "./column";

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};