import * as yup from "yup";

const bodyValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })

  export { bodyValidation }