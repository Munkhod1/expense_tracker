const sql = require("../config/db");

const getAllCategory = async (req, res) => {
  console.log("USER", req.user);
  const data = await sql`SELECT * FROM category`;

  res.status(200).json({ message: "success", category: data });
};

const createCategory = () => {};
const updateCategory = () => {};
const deleteCategory = () => {};

module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
