const { Pool } = require("pg");
const { LOCAL_DB_URL, ELEPHANT_DB_URL } = require("../config/");
const pool = new Pool({ connectionString: ELEPHANT_DB_URL });
const fetch = async (SQL, value) => {
  const client = await pool.connect();
  try {
    const {
      rows: [row],
    } = await client.query(SQL, value);
    return row;
  } finally {
    await client.release();
  }
};
const fetchAll = async (SQL, value) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(SQL, value);
    return rows;
  } finally {
    await client.release();
  }
};
module.exports = {
  fetch,
  fetchAll,
};
