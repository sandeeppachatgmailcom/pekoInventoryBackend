
/**
 * @swagger
 * /sales/delete-item:
 *   delete:
 *     summary: Delete an item from a sales bill
 *     description: >
 *       Deletes a sales item and reverts stock quantities back to relevant batch(es).  
 *       Use query params or path to pass identifiers; here we accept query params for compatibility:
 *       `salesId` and `itemId` are required. `batchId` is optional.
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: salesId
 *         required: true
 *         schema:
 *           type: string
 *         description: "SalesSummary ID"
 *       - in: query
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: "SalesItemDetails ID"
 *       - in: query
 *         name: batchId
 *         required: false
 *         schema:
 *           type: string
 *         description: "Optional batch ID to target specific batch"
 *     responses:
 *       200:
 *         description: Item deleted and stock reverted
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Sales item deleted and stock reverted"
 *       404:
 *         description: Item or sales bill not found
 *       500:
 *         description: Internal server error
 */
