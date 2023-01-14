import * as Yup from "yup";

const editHolidayValidationSchema = Yup.object().shape({
  date: Yup.date().required("Obrigatório"),
  title: Yup.string().required("Obrigatório"),
  description: Yup.string().required("Obrigatório"),
  legislation: Yup.string().required("Obrigatório"),
});

export { editHolidayValidationSchema };
