/**
 * @swagger
 * /users/send-otp:
 *   post:
 *     summary: Send OTP to user for verification
 *     description: >
 *       Sends an OTP (One Time Password) to the user's registered email or phone for login, registration, or password recovery.  
 *       OTP will be generated (typically 4-6 digits), stored temporarily with expiry (e.g., 5 minutes),  
 *       and sent to the user through Email/SMS based on the provided input.
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
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP successfully sent to user.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "OTP sent successfully"
 *               otpReferenceId: "abc123xyz890"
 *               expiryInSeconds: 300
 *       400:
 *         description: Missing or invalid details.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Email or phone is required"
 *       404:
 *         description: User not found (if verification is required)
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "User not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Failed to send OTP"
 */
