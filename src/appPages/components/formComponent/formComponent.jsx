import { Field } from "react-final-form";
import css from "./formComponent.module.css";

const required = (value) => (value ? undefined : " Required field!");

export const InputComponent = (name, placeholder, validate, type) => {
  return (
    <Field
      name={name}
      placeholder={placeholder}
      validate={validate ? required : undefined}
      type={type}
    >
      {({ input, meta, placeholder }) => (
        <div className={meta.active ? css.activeField : css.formItem}>
          <label className={css.label}> {placeholder}: </label>
          <input className={css.input} {...input} placeholder={placeholder} />
          {(meta.error || meta.submitError) && meta.touched && (
            <span className={css.errorBlock}>
              {" "}
              {meta.error || meta.submitError}{" "}
            </span>
          )}
        </div>
      )}
    </Field>
  );
};

export const TextareaComponent = (name, placeholder, validate, type) => {
  return (
    <Field
      name={name}
      placeholder={placeholder}
      validate={validate ? required : undefined}
      type={type}
    >
      {({ input, meta, placeholder }) => (
        <div className={css.formItem}>
          <label className={css.label}> {placeholder} </label>
          <textarea
            className={css.input}
            {...input}
            placeholder={placeholder}
          />
          {meta.error && meta.touched && (
            <span className={css.errorBlock}>{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
};
