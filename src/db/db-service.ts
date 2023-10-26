import { Database, openDatabase } from "expo-sqlite";
import { Column } from "./models";

export const getDBConnection = () => {
  return openDatabase("m4k.db");
};

// ------------------------------- Create Table ---------------------------------------
export const createTables = (
  db: Database,
  tableName: string,
  columns: Column[]
) => {
  let colInfos = "";
  columns.forEach((col, index) => {
    colInfos += `${col.name} ${col.dataType}`;
    // default value
    if (typeof col.defaultValue !== "undefined") {
      colInfos += ` DEFAULT ${col.defaultValue}`;
    }
    // not null
    if (col.notNull) {
      colInfos += ` NOT NULL`;
    }
    // Primary key
    if (col.primaryKey) {
      colInfos += " PRIMARY KEY AUTOINCREMENT";
    }
    // Unique
    if (col.unique) {
      colInfos += " UNIQUE";
    }
    // add , if not last col
    if (index < columns.length - 1) {
      colInfos += ",";
    }
  });
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${colInfos});`;
  db.transaction((tx) => {
    tx.executeSql(query);
  });
};

export const deleteTable = (db: Database, tableName: string) => {
  const query = `drop table ${tableName}`;
  db.transaction((tx) => {
    tx.executeSql(query);
  });
};

export const createBadges = (db: Database, badgeId: number) => {
  const query = `
  INSERT INTO badges (badgeId)
  VALUES('${badgeId}');
`;
  db.transaction((tx) => {
    tx.executeSql(
      query,
      [null],
      (txObj, resultSet) => {},
      (txObj, error) => {
        console.log("error createBadges", error);
        return Boolean(error);
      }
    );
  });
};

export const getBadges = (db: Database) => {
  const query = `
    SELECT *
    FROM badges`;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [null],
        (txObj, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (txObj, error) => {
          console.log("error getBadges", error);
          return Boolean(error);
        }
      );
    });
  });
};
