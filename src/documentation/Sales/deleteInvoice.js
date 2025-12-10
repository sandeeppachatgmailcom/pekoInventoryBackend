
/**
 * @swagger
 * /sales/delete-bill/{salesId}:
 *   delete:
 *     summary: Delete a sales bill
 *     description: >
 *       Deletes a sales bill and all its items. Upon deletion, the stock quantities for the deleted items will be reverted back to the warehouse/batches.  
 *       Use soft-delete if audit/history is required.
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: salesId
 *         required: true
 *         description: The unique ID of the sales bill to delete
 *         schema:
 *           type: string
 *           example: "67e2ef21b97e84d55c672999"
 *     responses:
 *       200:
 *         description: Sales bill deleted and stock reverted successfully
 *       404:
 *         description: Sales bill not found
 *       500:
 *         description: Internal server error
 */
