import { FieldValues, useController } from 'react-hook-form';
import { Textarea } from '@/components/fields/Textarea';
import { IFormTextareaProps } from './FormTextarea.props';

export const FormTextarea = <TFieldValues extends FieldValues = FieldValues>({ ...props }: IFormTextareaProps<TFieldValues>) => {
	const { name, rules, shouldUnregister, defaultValue, controlDisabled, form, ...otherProps } = props;
	const { control } = form;

	const {
		field: { value, ...fieldProps },
		fieldState: { error },
		formState: { disabled: disabledForm },
	} = useController({ control, name, rules, defaultValue, shouldUnregister, disabled: controlDisabled });

	const disabled = props.disabled || disabledForm;
	const errorMessage = error?.message;

	return (
		<Textarea
			//
			status={error ? 'error' : undefined}
			helperText={errorMessage}
			{...otherProps}
			{...fieldProps}
			value={value === null ? '' : value}
			required={!!rules?.required || otherProps.required}
			disabled={disabled}
		/>
	);
};
