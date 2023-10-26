export interface Column {
  name: string;
  dataType: string;
  defaultValue?: any;
  primaryKey?: boolean;
  notNull?: boolean;
  unique?: boolean;
}

export const models: { [key: string]: Column[] } = {
  badges: [
    { name: "id", primaryKey: true, dataType: "INTEGER", notNull: true },
    { name: "badgeId", dataType: "INTEGER", notNull: true },
    { name: "name", dataType: "TEXT", defaultValue: "''" },
  ],
};
