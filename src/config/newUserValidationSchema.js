import * as Yup from "yup";

const newUserValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Nazwa użytkownika jest wymagana')
        .min(6, 'Nazwa użytkownika musi składać się co najmniej z 6 znaków')
        .max(20, 'Nazwa użytkownika nie może przekraczać 20 znaków'),
    email: Yup.string()
        .required('Email jest wymagany')
        .email('Email jest zły'),
    password: Yup.string()
        .required('Hasło jest wymagane')
        .min(8, 'Hasło musi składać się co najmniej z 8 znaków')
        .max(30, 'Hasło nie może przekraczać 30 znaków'),
});

export default newUserValidationSchema;