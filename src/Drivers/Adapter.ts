import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { MySQLDriver } from "./MySQL/Driver";
import mysql from "mysql2/promise";
export class SQLiteHelper {
  private sqliteDb: Database<sqlite3.Database, sqlite3.Statement> | null = null;
  private mysqlDriver: MySQLDriver = new MySQLDriver();

  async initSqlite3(dbPath: string): Promise<void> {
    this.sqliteDb = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  }

  async initMysql(config: mysql.PoolOptions): Promise<void> {
    await this.mysqlDriver.connect(config);
  }

  async executeSqlite3(query: string, params: any[] = []): Promise<any> {
    if (!this.sqliteDb) {
      throw new Error("SQLite veritabanı başlatılmadı.");
    }
    return this.sqliteDb.run(query, params);
  }

  async fetchSqlite3(query: string, params: any[] = []): Promise<any[]> {
    if (!this.sqliteDb) {
      throw new Error("SQLite veritabanı başlatılmadı.");
    }
    return this.sqliteDb.all(query, params);
  }

  async executeMysql(query: string, params: any[] = []): Promise<any> {
    return this.mysqlDriver.execute(query, params);
  }

  async fetchMysql(query: string, params: any[] = []): Promise<any[]> {
    return this.mysqlDriver.fetch(query, params);
  }

  async closeSqlite3(): Promise<void> {
    if (this.sqliteDb) {
      await this.sqliteDb.close();
      this.sqliteDb = null;
    }
  }

  async closeMysql(): Promise<void> {
    await this.mysqlDriver.close();
  }
}
