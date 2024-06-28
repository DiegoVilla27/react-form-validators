import * as yup from "yup";

const MAX_FILE_SIZE: number = 2 * 1024 * 1024;
const SUPPORTED_FORMATS: string[] = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];

export const validations = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Min: 3")
    .max(20, "Max: 20"),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .typeError("Age must be a number")
    .required("Age is required")
    .min(18, "Min: 18")
    .max(100, "Max: 100"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email is invalid")
    .max(100, "Max: 100"),
  /*VALIDATION ASYNC IN YUP, BUT ALWAYS EXEC
      .test('checkEmail', 'Email already exists', async (value: string) => {
        if (value) {
          const exists = await checkIfEmailExists(value);
          return !exists;
        } return true;
      })*/ password: yup
    .string()
    .required("Password is required")
    .min(8, "Min: 8")
    .max(20, "Max: 20")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,30}$/,
      "Password must contain at least one uppercase letter, one lowercase letter and one digit without spaces."
    ),
  passwordConfirm: yup
    .string()
    .required("Password confirm is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  image: yup
    .mixed()
    .test(
      "required",
      "Image is required",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value: any) => {
        if (value && value.length === 0) return false;
        return true;
      }
    )
    .test(
      "fileSize",
      "File size is too large",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value: any) => {
        if (value && value.length === 0) return true;
        return value[0].size <= MAX_FILE_SIZE;
      }
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value: any) => {
        if (value && value.length === 0) return true;
        return SUPPORTED_FORMATS.includes(value[0].type);
      }
    )
});
