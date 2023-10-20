import * as yup from "yup"

const bodyCreateValidation = yup.object().shape({
    position: yup.string().required(),
    salary: yup.string(),
    city: yup.string().required(),
    uf:yup.string().required(),
    technology: yup.array().of(yup.string()).required(),
    website: yup.string().required(),
    company: yup.string(),
    description: yup.string().required(),
    link: yup.string().required()
})

export { bodyCreateValidation }