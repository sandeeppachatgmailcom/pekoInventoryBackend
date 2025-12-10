/**
 * @swagger
 * /supplier/list:
 *   get:
 *     summary: Get supplier list with pagination
 *     description: >
 *       Retrieves all suppliers with pagination support.  
 *       Can filter by search key (name, email, phone etc).
 *     tags:
 *       - Supplier
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: perPage
 *         in: query
 *         required: false
 *         description: Number of records per page
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: searchKey
 *         in: query
 *         required: false
 *         description: Search by supplier name / email / phone
 *         schema:
 *           type: string
 *           example: "abc"
 *     responses:
 *       200:
 *         description: Supplier list fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Supplier list fetched"
 *               data:
 *                 suppliers:
 *                   - id: "1"
 *                     supplierName: "ABC Traders"
 *                     phone: "9876543210"
 *                     email: "abc@gmail.com"
 *                     address: "Kochi, Kerala"
 *                   - id: "2"
 *                     supplierName: "Global Mart"
 *                     phone: "9874563210"
 *                     email: "global@gmail.com"
 *                     address: "Bangalore"
 *               meta:
 *                 page: 1
 *                 perPage: 10
 *                 total: 23
 *                 totalPages: 3
 *                 searchKey: "abc"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
