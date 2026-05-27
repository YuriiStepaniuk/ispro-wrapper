import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // ── App ──────────────────────────────────────────────────────────────────────
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().port().default(4000),

  CLIENT_URL: Joi.string().uri().required(),

  // ── IsPro connection ─────────────────────────────────────────────────────────
  ISPRO_PORT: Joi.number().port().default(14000),

  ISPRO_BASE_URL: Joi.string().required(),

  // ── IsPro credentials ────────────────────────────────────────────────────────
  ISPRO_LOGIN: Joi.string().required(),

  ISPRO_PASSWORD: Joi.string().required(),

  ISPRO_FIRM_CODE: Joi.number().integer().positive().required(),
});
