/**
 * @swagger
 * /supplier/delete/{id}:
 *   delete:
 *     summary: Delete supplier by ID
 *     description: >
 *       Deletes supplier record permanently.  
 *       Admin authentication required.
 *     tags:
 *       - Supplier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
