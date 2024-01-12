/**
 * This array for public routes
 * does not require authentication
 * @type {string}
 */
export const publicRoutes=[
    "/"
];

/**
 * This array for Auth Routes
 * for authentication
 * @type {string[]}
 */
export const authRoutes=[
    "/auth/login",
    "/auth/register"
]

/**
 * This route is api prefix routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * This route is to redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";