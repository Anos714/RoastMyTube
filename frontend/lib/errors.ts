import { NextResponse } from "next/server";

/** Typed backend errors — thrown in lib/, mapped to HTTP in routes. */
export class ApiError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, message?: string) {
    super(message ?? code);
    this.status = status;
    this.code = code;
  }
}

export class AuthError extends ApiError {
  constructor() {
    super(401, "unauthorized", "Login required");
  }
}
export class NeedReloginError extends ApiError {
  constructor() {
    super(401, "relogin", "Google session expired — please sign in again");
  }
}
export class QuotaExceededError extends ApiError {
  constructor() {
    super(429, "quota", "YouTube quota exhausted for today — try tomorrow");
  }
}
export class EmptyProfileError extends ApiError {
  constructor() {
    super(200, "empty", "No YouTube activity found to roast");
  }
}
export class LlmRateError extends ApiError {
  constructor() {
    super(429, "slow_down", "Roast machine is overheating — retry in a minute");
  }
}
export class RoastFailedError extends ApiError {
  constructor() {
    super(502, "roast_failed", "AI refused to cook — try again");
  }
}

export function toErrorResponse(err: unknown): NextResponse {
  if (err instanceof ApiError) {
    return NextResponse.json({ error: err.code }, { status: err.status });
  }
  console.error("[api] unexpected error:", err);
  return NextResponse.json({ error: "internal" }, { status: 500 });
}
