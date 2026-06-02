/**
 * API key generation/hashing — mirrors the ER API (er-api/deploy/app/keys.py)
 * so keys issued by the console authenticate against the live API.
 *
 * Format: erk_live_<32 hex>. Only sha256(plaintext) is stored; plaintext is
 * shown to the user once at issuance and never recoverable.
 */
import { randomBytes, createHash } from "crypto";

export const KEY_PREFIX = "erk_live_";
const PREFIX_SHOW = 12; // leading chars stored/shown as key_prefix

export function generateKey(): string {
  return KEY_PREFIX + randomBytes(16).toString("hex"); // 32 hex chars
}

export function hashKey(plaintext: string): string {
  return createHash("sha256").update(plaintext.trim(), "utf-8").digest("hex");
}

export function keyPrefix(plaintext: string): string {
  return plaintext.trim().slice(0, PREFIX_SHOW);
}
