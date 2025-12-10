/**
 * @swagger
 * /sales-order/list:
 *   get:
 *     summary: List all sales orders with pagination and search
 *     description: >
 *       Retrieves a paginated list of sales orders.  
 *       Supports filtering by customerId, date range, invoiceNumber search, and placeOfSupply.
 *     tags:
 *       - Sales Order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: > 
 *           Page number for pagination (default: 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: perPage
 *         required: false
 *         description: >
 *           Number of sales orders per page (default: 10)
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: customerId
 *         required: false
 *         description: Filter orders by customer ID
 *         schema:
 *           type: string
 *           example: "64f29a1223ab8a9cd013d5e7"
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: Filter orders from this date (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           example: "2025-01-01"
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: Filter orders up to this date (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           example: "2025-12-31"
 *       - in: query
 *         name: search
 *         required: false
 *         description: Search orders by invoice number or customerName
 *         schema:
 *           type: string
 *           example: "SORD-1001"
 *        
 *     responses:
 *       200:
 *         description: Paginated list of sales orders fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Sales orders fetched successfully"
 *               data:
 *                 currentPage: 1
 *                 perPage: 10
 *                 totalPages: 2
 *                 totalData: 15
 *                 salesOrders:
 *                   - orderId: "67c2ef21b97e84d55c672002"
 *                     customerId: "64f29a1223ab8a9cd013d5e7"
 *                     customerName: "John Traders"
 *                     invoiceNumber: "SORD-1001"
 *                     orderDate: "2025-12-09"
 *                     placeOfSupply: "Kerala"
 *                     totalAmount: 5000
 *                     taxAmount: 900
 *                     cgst: 450
 *                     sgst: 450
 *                     igst: 0
 *                     invoiceType: "Regular"
 *                   - orderId: "67c2ef21b97e84d55c672003"
 *                     customerId: "64f29a1223ab8a9cd013d5e8"
 *                     customerName: "Alpha Traders"
 *                     invoiceNumber: "SORD-1002"
 *                     orderDate: "2025-12-10"
 *                     placeOfSupply: "Kerala"
 *                     totalAmount: 3000
 *                     taxAmount: 540
 *                     cgst: 270
 *                     sgst: 270
 *                     igst: 0
 *                     invoiceType: "Regular"
 *       500:
 *         description: Internal server error
 */
