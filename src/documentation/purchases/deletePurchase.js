/**
 * @swagger
 * /purchase/delete-purchase-bill/{purchaseId}:
 *   delete:
 *     summary: Delete a purchase bill
 *     description: >
 *       Deletes a purchase bill along with all its purchase items.  
 *       Upon deletion, the stock quantities of the items will be reverted back to the warehouse/inventory.  
 *       This ensures inventory consistency after removing a purchase record.
 *     tags:
 *       - Purchase
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: purchaseId
 *         required: true
 *         description: The unique ID of the purchase bill to delete
 *         schema:
 *           type: string
 *           example: "67c2ef21b97e84d55c672002"
 *     responses:
 *       200:
 *         description: Purchase bill deleted successfully and stock reverted
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Purchase bill deleted and stock reverted successfully"
 *       404:
 *         description: Purchase bill not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Purchase bill not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error"
 */
