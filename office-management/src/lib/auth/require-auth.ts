import { verifyAccessToken } from "@/lib/auth/jwt";
import { ApiError } from "@/lib/errors/api-error";
import { userRepository } from "@/server/repositories/user.repository";

export async function requireAuth(authHeader?: string) {
  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized.");
  }

  const token = authHeader.substring(7);

  let payload;

  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new ApiError(401, "Unauthorized.");
  }

  const user = await userRepository.findById(payload.userId);

  if (!user) {
    throw new ApiError(401, "Unauthorized.");
  }

  return user;
}