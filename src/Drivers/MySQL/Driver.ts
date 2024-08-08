import mysql from "mysql2/promise";

export class MySQLDriver {
  private pool: mysql.Pool | null = null;

  async connect(config: mysql.PoolOptions): Promise<void> {
    this.pool = mysql.createPool(config);
  }

  async execute(query: string, params: any[] = []): Promise<any> {
    if (!this.pool) {
      throw new Error("MySQL bağlantısı başlatılmadı.");
    }
    const [results] = await this.pool.query(query, params);
    return results;
  }

  async fetch(query: string, params: any[] = []): Promise<any[]> {
    return this.execute(query, params) as Promise<any[]>;
  }

  async createTable(tableName: string, columns: string): Promise<void> {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;
    await this.execute(query);
  }

  async insert(
    tableName: string,
    columns: string,
    values: string,
    params: any[],
  ): Promise<void> {
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
    await this.execute(query, params);
  }

  async update(
    tableName: string,
    updates: string,
    where: string,
    params: any[],
  ): Promise<void> {
    const query = `UPDATE ${tableName} SET ${updates} WHERE ${where}`;
    await this.execute(query, params);
  }

  async delete(tableName: string, where: string, params: any[]): Promise<void> {
    const query = `DELETE FROM ${tableName} WHERE ${where}`;
    await this.execute(query, params);
  }

  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}
