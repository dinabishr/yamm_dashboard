//Defines a table column structure for data of type `T`.


export type Column<T> = {
    key: keyof T| string; //property of 'T' ,column data
    label: string; //column header text
    render?: (item: T) => React.ReactNode; //custom render function for cell content
  };