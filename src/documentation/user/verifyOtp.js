/**
 * @swagger
 * /users/verify-otp:
 *   post:
 *     summary: Verify OTP for account/login validation
 *     description: >
 *       Verifies the OTP sent to the user for authentication, registration, or password reset.  
 *       Matches the submitted OTP with the stored/active one, checks expiry, and marks user as verified or allows login flow.
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
 *               - otp
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *                 example: "user@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "OTP verified successfully"
 *               token: "jwt-access-token-if-login-flow"
 *               userId: "67b6f6da8f963fae8ff8d15f"
 *       400:
 *         description: Wrong or expired OTP.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid or expired OTP"
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
 *               message: "Failed to verify OTP"
 */
