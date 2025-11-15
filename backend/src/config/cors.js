import { WHITELIST_DOMAINS } from "~/utils/constants";
import { env } from "~/config/environment";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const getAllowedOrigins = () => {
  const origins = [...WHITELIST_DOMAINS];

  if (env.FRONTEND_URL && !origins.includes(env.FRONTEND_URL)) {
    origins.push(env.FRONTEND_URL);
  }

  if (env.BUILD_MODE === "production") {
    return origins.filter(
      (origin) => !origin.includes("localhost") && !origin.includes("127.0.0.1")
    );
  }

  return origins;
};

export const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = getAllowedOrigins();

    if (!origin) {
      if (env.BUILD_MODE === "development") {
        return callback(null, true);
      }
      return callback(
        new ApiError(StatusCodes.FORBIDDEN, "Origin header required")
      );
    }

    if (env.BUILD_MODE === "production") {
      if (!origin.startsWith("https://")) {
        console.error(
          `CORS rejected non-HTTPS origin in production: ${origin}`
        );
        return callback(
          new ApiError(StatusCodes.FORBIDDEN, "HTTPS required in production")
        );
      }
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (env.BUILD_MODE === "development") {
      console.warn(`⚠️  CORS blocked origin: ${origin}`);
      console.warn(`    Allowed origins:`, allowedOrigins);
    } else {
      console.error(`🚨 CORS security: Blocked unauthorized origin: ${origin}`);
    }

    return callback(
      new ApiError(
        StatusCodes.FORBIDDEN,
        env.BUILD_MODE === "development"
          ? `${origin} not allowed by CORS policy. Check backend/src/utils/constants.js`
          : "Access denied"
      )
    );
  },

  /**
   * Credentials support
   * Required for cookies, authorization headers, and TLS client certificates
   */
  credentials: true,

  /**
   * Allowed HTTP methods
   */
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],

  /**
   * Allowed request headers
   * Add any custom headers your frontend sends
   */
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],

  /**
   * Exposed response headers
   * Headers that the browser can access in the response
   */
  exposedHeaders: [
    "Content-Length",
    "Content-Range",
    "X-Content-Range",
    "X-Total-Count",
  ],

  /**
   * Preflight cache duration (in seconds)
   * 24 hours = 86400 seconds
   * Reduces preflight requests for better performance
   */
  maxAge: 86400,

  /**
   * Success status for legacy browsers
   * Some legacy browsers (IE11) choke on 204
   */
  optionsSuccessStatus: 200,

  /**
   * Continue on error
   * Pass CORS errors to error handlers
   */
  preflightContinue: false,
};
