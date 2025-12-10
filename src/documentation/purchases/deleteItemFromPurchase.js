/**
 * @swagger
 * /purchase/delete-item:
 *   delete:
 *     summary: Delete an item from a purchase bill
 *     description: Deletes a purchase item and updates PurchaseSummary totals and taxes.
 *     tags:
 *       - Purchase
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: purchaseId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: batchId
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted and summary updated
 *       404:
 *         description: Item or purchase not found
 *       500:
 *         description: Internal server error
 */
