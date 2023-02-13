import { TextInput, PasswordInput, TextInputProps } from "@mantine/core";
import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mantine/dates";

export interface LabeledTextFieldProps extends PropsWithoutRef<TextInputProps> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number" | "date";
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
  labelProps?: ComponentPropsWithoutRef<"label">;
}

export const DateForm = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      control,
      formState: { isSubmitting, errors },
    } = useFormContext();

    const error = errors[name]?.message as string;

    return (
      <div {...outerProps}>
        <label {...labelProps}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <DatePicker
                  error={error}
                  label={label}
                  disabled={isSubmitting}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  required={props.required}
                  placeholder={props.placeholder}
                />
              </>
            )}
            name={name}
            {...props}
          />
        </label>
      </div>
    );
  }
);

export default DateForm;
