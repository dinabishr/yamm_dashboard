export type Column<T> = {
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode;
  };