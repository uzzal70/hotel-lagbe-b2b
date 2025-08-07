import * as Yup from 'yup';

export const validationSchema = Yup.object({
  adult: Yup.array().of(
    Yup.object().shape({
      lastName: Yup.string().required('Surname / Last name is required'),
      firstName: Yup.string().required('Given Name / First name is required'),
      gender: Yup.string().required('Gender is required'),
      dateOfBirth: Yup.string().required('Date of birth is required'),
      nationalityCountry: Yup.string().required(
        'nationalityCountry is required'
      ),
      passportNo: Yup.string().required('Passport number is required'),
      passportEx: Yup.string().required('Passport expiry date is required'),
    })
  ),
  child: Yup.array().of(
    Yup.object().shape({
      lastName: Yup.string().required('Surname / Last name is required'),
      firstName: Yup.string().required('Given Name / First name is required'),
      gender: Yup.string().required('Gender is required'),
      dateOfBirth: Yup.string().required('Date of birth is required'),
      nationalityCountry: Yup.string().required(
        'nationalityCountry is required'
      ),
      passportNo: Yup.string().required('Passport number is required'),
      passportEx: Yup.string().required('Passport expiry date is required'),
    })
  ),
  infant: Yup.array().of(
    Yup.object().shape({
      lastName: Yup.string().required('Surname / Last name is required'),
      firstName: Yup.string().required('Given Name / First name is required'),
      gender: Yup.string().required('Gender is required'),
      dateOfBirth: Yup.string().required('Date of birth is required'),
      nationalityCountry: Yup.string().required(
        'nationalityCountry is required'
      ),
      passportNo: Yup.string().required('Passport number is required'),
      passportEx: Yup.string().required('Passport expiry date is required'),
    })
  ),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: Yup.string()
    .required('Phone is required')
    .min(10, 'Phone number must be at least 10 to 15 characters'),
  termandcondition: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
});
