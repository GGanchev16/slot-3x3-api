import * as yup from "yup";

export const playSchema = yup.object().shape({
  bet: yup.number().positive().required(),
});

export const simSchema = yup.object().shape({
  count: yup.number().positive().required(),
  bet: yup.number().positive().required(),
});
