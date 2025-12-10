/**
 * @swagger
 * /purchase/list:
 *   get:
 *     summary: List all purchase bills with pagination, filtering, and search
 *     description: "Retrieves a paginated list of all purchase bills. Supports filtering by supplier, date range, and searching by invoice number."
 *     tags:
 *       - Purchase
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
 *         description: "Number of purchase bills per page (default: 10)"
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: supplierId
 *         required: false
 *         description: "Filter purchase bills by supplier ID"
 *         schema:
 *           type: string
 *           example: "64f29a1223ab8a9cd013d5e7"
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: "Filter purchase bills from this date (YYYY-MM-DD)"
 *         schema:
 *           type: string
 *           example: "2025-01-01"
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: "Filter purchase bills up to this date (YYYY-MM-DD)"
 *         schema:
 *           type: string
 *           example: "2025-12-31"
 *       - in: query
 *         name: search
 *         required: false
 *         description: "Search purchase bills by invoice number or notes"
 *         schema:
 *           type: string
 *           example: "INV-1001"
 *     responses:
 *       200:
 *         description: "Paginated list of purchase bills fetched successfully"
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Purchase bills fetched successfully"
 *               data:
 *                 currentPage: 1
 *                 perPage: 10
 *                 totalPages: 3
 *                 totalData: 25
 *                 purchaseBills:
 *                   - id: "67c2ef21b97e84d55c672002"
 *                     supplierId: "64f29a1223ab8a9cd013d5e7"
 *                     supplierName: "ABC Suppliers"
 *                     purchaseDate: "2025-02-10"
 *                     invoiceNumber: "INV-1001"
 *                     totalAmount: 5000
 *                     cgstTotal: 250
 *                     sgstTotal: 250
 *                     igstTotal: 0
 *                     notes: "First purchase order"
 *                   - id: "67c2ef21b97e84d55c672003"
 *                     supplierId: "64f29a1223ab8a9cd013d5e7"
 *                     supplierName: "ABC Suppliers"
 *                     purchaseDate: "2025-03-05"
 *                     invoiceNumber: "INV-1002"
 *                     totalAmount: 7500
 *                     cgstTotal: 375
 *                     sgstTotal: 375
 *                     igstTotal: 0
 *                     notes: "Second purchase order"
 *       500:
 *         description: "Internal server error"
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
    