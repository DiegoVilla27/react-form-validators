import { ErrorMessage } from "@hookform/error-message";
import { ReactElement } from "react";
import { FieldErrors, ValidateResult } from "react-hook-form";
import { IForm } from "../../hooks";
import ItemMsgError from "./item";
import "./styles.modules.css";

const HTMLError: (type: string, message: ValidateResult) => ReactElement = (
  type: string,
  message: ValidateResult
) => {
  return (
    <ItemMsgError
      key={type}
      message={message}
    />
  );
};

export const ErrorMessageCustom = (
  errors: FieldErrors<IForm>,
  name: keyof IForm
) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) => {
        return messages
          ? Object.entries(messages).map(
              ([type, message]: [string, ValidateResult]) =>
                HTMLError(type, message)
            )
          : null;
      }}
    />
  );
};
