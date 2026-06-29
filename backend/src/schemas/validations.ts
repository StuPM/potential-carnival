import type { Context } from "hono";

// TODO Tidy up and present a more user friendly message
export const onValidationError = (result, c: Context) => {
  if (!result.success) {
    return c.json({ message: "Validation fail", errors: result.error }, 400);
  }
};
