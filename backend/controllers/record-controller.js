const sql = require("../config/db");

const getAllRecord = async (req, res) => {
  try {
    const guilgee = await sql`SELECT * FROM record`;
    res.status(200).json({ guilgee });
  } catch (error) {
    res.status(400).json({ message: "failded", error });
  }
};

const getInfo = async (req, res) => {
  try {
    const [income, expense] =
      await sql`SELECT transaction_type, SUM(amount) FROM record 
                GROUP BY transaction_type`;
    res.status(200).json({ income, expense });
  } catch (error) {
    res.status(400).json({ message: "failded", error });
  }
};

const getChartData = async (req, res) => {
  try {
    const donutChartData = await sql`
    SELECT SUM(r.amount), c.name cat_name 
    FROM record r INNER JOIN category c 
    ON r.cid=c.id WHERE r.transaction_type='EXP' 
    GROUP BY cat_name;
    `;
    const barChartData = await sql`
    -- barChart аа гаргаж ирье
    SELECT 
    TO_CHAR(DATE_TRUNC('month', r.created_at), 'Mon') AS sar,
    EXTRACT(YEAR FROM r.created_at) AS year,
    SUM(CASE WHEN r.transaction_type='INC' THEN r.amount ELSE 0 END)
    AS total_income,
    SUM(CASE WHEN r.transaction_type='EXP' THEN r.amount ELSE 0 END)
    AS total_expense
    FROM record r
    GROUP BY
    DATE_TRUNC('month', r.created_at), 
    EXTRACT(YEAR FROM r.created_at)
    ORDER BY 
    year, DATE_TRUNC('month', r.created_at);
    `;
    res
      .status(200)
      .json({ message: "success", donut: donutChartData, bar: barChartData });
  } catch (error) {
    res.status(400).json({ message: "failded", error });
  }
};

module.exports = { getAllRecord, getInfo, getChartData };
