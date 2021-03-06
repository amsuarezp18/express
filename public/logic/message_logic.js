const joi = require("joi");

function validate(msg) {
  const schema = joi.object({
    author: joi
      .string()
      .pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/)
      .required(),
    message: joi.string().min(5).required(),
    ts: joi.number(),
  });

  const validation = schema.validate(msg);
  if (validation.error) {
    return validation.error;
  }
  return "OK";
}
exports.validate = validate;