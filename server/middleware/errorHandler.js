// Internal errors (SDK, missing keys, DB) are logged in full but never shown
// to the user as raw English stack text.
export function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || 500;
  console.error('[api error]', status, err.message);
  const friendly = status >= 500
    ? 'הדוח לא נוצר בגלל תקלה זמנית בשרת. נסה שוב בעוד כמה דקות. / The report could not be created due to a temporary server problem. Please try again in a few minutes.'
    : err.message;
  res.status(status).json({ error: friendly });
}
