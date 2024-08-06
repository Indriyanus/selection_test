import * as Yup from 'yup';

export const paragraphSchema = Yup.object().shape({
    paragraph: Yup.string()
        .required("Paragraph is required")
        .min(10, "Paragraph must be at least 10 characters long"),
});