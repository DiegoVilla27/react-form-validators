import { ErrorMessageCustom } from "./components/msg-error";
import ItemMsgError from "./components/msg-error/item";
import useApp from "./hooks";

function App() {
  const { validForm, register, errors, handleSubmit, onSubmit, checkEmail } =
    useApp();

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <h1>Register</h1>
        <input
          {...register("name")}
          className={errors["name"] ? "input-error" : ""}
          type="string"
          placeholder="Name"
        />
        {ErrorMessageCustom(errors, "name")}
        <input
          {...register("age")}
          className={errors["age"] ? "input-error" : ""}
          type="number"
          placeholder="Age"
        />
        {ErrorMessageCustom(errors, "age")}
        <input
          {...register("email")}
          className={errors["email"] ? "input-error" : ""}
          type="email"
          placeholder="Email"
          onBlur={(evt) => checkEmail(evt.target.value)}
        />
        {ErrorMessageCustom(errors, "email")}
        {errors["email"]?.type === "validate" && (
          <ItemMsgError message={errors["email"]?.message} />
        )}
        <input
          {...register("password")}
          className={errors["password"] ? "input-error" : ""}
          type="password"
          placeholder="Password"
        />
        {ErrorMessageCustom(errors, "password")}
        <input
          {...register("passwordConfirm")}
          className={errors["passwordConfirm"] ? "input-error" : ""}
          type="password"
          placeholder="Confirm password"
        />
        {ErrorMessageCustom(errors, "passwordConfirm")}
        <input
          {...register("image")}
          type="file"
        />
        {ErrorMessageCustom(errors, "image")}
        <button
          type="submit"
          disabled={!validForm}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default App;
