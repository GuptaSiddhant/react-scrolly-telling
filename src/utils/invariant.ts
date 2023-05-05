/**
 * @name tiny-invariant
 * @author Alex Reardon <alexreardon@gmail.com>
 * @license MIT https://unpkg.com/browse/tiny-invariant@1.2.0/LICENSE
 * @see https://unpkg.com/browse/tiny-invariant@1.2.0/src/tiny-invariant.ts
 */

const prefix = "Invariant failed";

/** Throw an error if the condition fails */
export default function invariant(
  condition: unknown,
  message?: string
): asserts condition {
  if (condition) {
    return;
  }

  throw new Error(message ? `${prefix}: ${message}` : prefix);
}
