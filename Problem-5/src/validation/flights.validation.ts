import Joi from 'joi';

export const createFlightsValidation = {
  body: Joi.object({
    data: Joi.array().items({
      from: Joi.string().required().messages({
        'string.base': `from should be a type of text`,
        'any.required': `from is a required field`,
      }),
      to: Joi.string().required().messages({
        'string.base': `to should be a type of text`,
        'any.required': `to is a required field`,
      }),
    }),
  }),
};

export const getFlightValidation = {
  params: Joi.object({
    id: Joi.string().required().messages({
      'any.required': `id is a required field`,
    }),
  }),
};

export const updateFlightValidation = {
  params: Joi.object({
    id: Joi.string().required().messages({
      'any.required': `id is a required field`,
    }),
  }),
  body: Joi.object({
    data: Joi.object().keys({
      from: Joi.string().messages({
        'string.base': `from should be a type of text`,
        'any.required': `from is a required field`,
      }),
      to: Joi.string().messages({
        'string.base': `to should be a type of text`,
        'any.required': `to is a required field`,
      }),
    }),
  }),
};
