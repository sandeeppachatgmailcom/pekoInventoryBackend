const MySqlDb = require("../../database/ConnectMySql");

const getPurchaseListFn = async ({
  page = 1,
  perPage = 10,
  supplierId = null,
  startDate = null,
  endDate = null,
  search = ""
}) => {
  const connection = await MySqlDb.getConnection();

  try {
    // sanitize/normalize pagination inputs
    const pageNum = Number.isInteger(Number(page)) && Number(page) > 0 ? Number(page) : 1;
    const perPageNum = Number.isInteger(Number(perPage)) && Number(perPage) > 0 ? Number(perPage) : 10;
    const offset = (pageNum - 1) * perPageNum;

    // build where clause and parameters
    let whereClause = "WHERE ps.deleted = 0";
    const params = [];

    if (supplierId) {
      whereClause += " AND ps.supplierId = ?";
      params.push(supplierId);
    }

    // if only one date provided, treat it as exact date or start/end appropriately
    if (startDate && endDate) {
      whereClause += " AND ps.invoiceDate BETWEEN ? AND ?";
      params.push(startDate, endDate);
    } else if (startDate) {
      whereClause += " AND ps.invoiceDate >= ?";
      params.push(startDate);
    } else if (endDate) {
      whereClause += " AND ps.invoiceDate <= ?";
      params.push(endDate);
    }

    if (search && String(search).trim() !== "") {
      whereClause += " AND ps.invoiceNumber LIKE ?";
      params.push(`%${search}%`);
    }

    // Query for rows (pass numeric limit and offset separately)
    const listSql = `
      SELECT
        ps.id,
        ps.supplierId,
        s.name AS supplierName,
        ps.invoiceNumber,
        ps.invoiceDate,
        ps.totalAmount,
        ps.taxAmount,
        ps.created_at
      FROM purchase_summary ps
      LEFT JOIN suppliers s ON ps.supplierId = s.id
      ${whereClause}
      ORDER BY ps.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await connection.query(listSql, [...params, perPageNum, offset]);

    // Query for total count (use same whereClause but without limit/offset)
    const countSql = `
      SELECT COUNT(*) AS total
      FROM purchase_summary ps
      ${whereClause}
    `;

    const [countRows] = await connection.query(countSql, params);

    return {
      status: true,
      message: "Purchase list fetched successfully",
      data: {
        page: pageNum,
        perPage: perPageNum,
        total: countRows[0]?.total || 0,
        purchases: rows
      }
    };

  } catch (error) {
    return { status: false, message: error.message };
  } finally {
    connection.release();
  }
};

module.exports = getPurchaseListFn;
