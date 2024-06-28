import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { checkIfEmailExists } from "../services";
import { validations } from "../validations";

export interface IForm {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

const useApp = () => {
  const {
    watch,
    //reset,
    register,
    //clearErrors,
    setError,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(validations) as any,
    criteriaMode: "all",
    mode: "all"
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (_value: IForm) => {
    //cleanForm();
  };

  /*const cleanForm = () => {
    reset();
    clearErrors();
  };*/

  const checkEmail = async (email: string) => {
    const exists = await checkIfEmailExists(email);

    // If email exists, update error
    if (exists) {
      // Create error message
      setError(
        "email",
        { type: "validate", message: "Email already exists" }
        //{ shouldFocus: true } // Focus input when has error
      );
    }
  };

  const validForm: boolean = isValid && !(errors["email"]?.type === "validate");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const subscription = watch((_value) => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  return {
    validForm,
    register,
    errors,
    handleSubmit,
    onSubmit,
    checkEmail
  };
};

export default useApp;
