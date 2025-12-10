/**
 * @swagger
 * /sales/listInvoices:
 *   get:
 *     summary: List all sales bills with pagination, filtering, and search
 *     description: "Retrieves a paginated list of sales bills. Supports filtering by customerId, date range, invoiceNumber search and placeOfSupply."
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: "Page number for pagination (default: 1)"
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: perPage
 *         required: false
 *         description: "Number of sales bills per page (default: 10)"
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: customerId
 *         required: false
 *         description: "Filter sales by customer ID"
 *         schema:
 *           type: string
 *           example: "67d9a1a2b97e84d55c672100"
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: "Filter sales from this date (YYYY-MM-DD)"
 *         schema:
 *           type: string
 *           example: "2025-01-01"
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: "Filter sales up to this date (YYYY-MM-DD)"
 *         schema:
 *           type: string
 *           example: "2025-12-31"
 *       - in: query
 *         name: search
 *         required: false
 *         description: "Search sales by invoice number or customerName"
 *         schema:
 *           type: string
 *           example: "SINV-1001"
 *       - in: query
 *         name: placeOfSupply
 *         required: false
 *         description: "Filter by place of supply"
 *         schema:
 *           type: string
 *           example: "Karnataka"
 *     responses:
 *       200:
 *         description: "Paginated list of sales bills fetched successfully"
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Sales bills fetched successfully"
 *               data:
 *                 currentPage: 1
 *                 perPage: 10
 *                 totalPages: 2
 *                 totalData: 12
 *                 salesBills:
 *                   - id: "67e2ef21b97e84d55c672999"
 *                     customerId: "67d9a1a2b97e84d55c672100"
 *                     customerName: "Rahul Traders"
 *                     invoiceNumber: "SINV-1001"
 *                     invoiceType: "B2B"
 *                     salesDate: "2025-12-09"
 *                     totalAmount: 3000
 *                     cgstTotal: 135
 *                     sgstTotal: 135
 *                     placeOfSupply: "Kerala"
 *                   - id: "67e2ef21b97e84d55c672998"
 *                     customerId: "67d9a1a2b97e84d55c672101"
 *                     customerName: "Alpha Stores"
 *                     invoiceNumber: "SINV-1000"
 *                     invoiceType: "Retail"
 *                     salesDate: "2025-12-08"
 *                     totalAmount: 4500
 *                     cgstTotal: 202.5
 *                     sgstTotal: 202.5
 *                     placeOfSupply: "Karnataka"
 *       500:
 *         description: "Internal server error"
 */
