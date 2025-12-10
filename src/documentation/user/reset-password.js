/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Reset password using verified OTP
 *     description: >
 *       Allows user to set a new password after successful OTP verification.  
 *       Typically used in "Forgot Password" flow.  
 *       Requires email/phone + new password + otp or reference ID depending on implementation.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrPhone
 *               - newPassword
 *               - otp
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *                 example: "user@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "StrongPassword@123"
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Password reset successful"
 *       400:
 *         description: OTP invalid/expired or wrong details.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid OTP or password format"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Unable to reset password"
 */
