import { Column } from "./column";

//Defines the properties for a reusable table component

export type TableProps<T> = {
  data: T[]; // array of data items to be displayed in the table
  columns: Column<T>[]; //column configuration for rendering the table
};