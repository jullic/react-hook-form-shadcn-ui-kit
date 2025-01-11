import { FC, TextareaHTMLAttributes, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { ITextareaProps } from './Textarea.props';
import { cn } from '@/lib/utils';
import { FieldWrapper } from '@/components/helpers/FieldWrapper';
import { useAutosizeTextArea } from './useAutosizeTextArea';

export type AutosizeTextAreaRef = {
	textArea: HTMLTextAreaElement;
	maxHeight: number;
	minHeight: number;
};

type AutosizeTextAreaProps = {
	maxHeight?: number | string;
	minHeight?: number | string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: FC<AutosizeTextAreaProps & ITextareaProps> = ({
	className,
	descriptionText,
	helperText,
	label,
	status,
	required,
	maxHeight = Number.MAX_SAFE_INTEGER,
	minHeight = '2.25',
	value,
	onChange,
	ref,
	...props
}) => {
	const wrapperProps = { descriptionText, helperText, label, status, required };

	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
	const [triggerAutoSize, setTriggerAutoSize] = useState('');

	useAutosizeTextArea({
		textAreaRef,
		triggerAutoSize: triggerAutoSize,
		maxHeight,
		minHeight,
	});

	useImperativeHandle(
		ref,
		() =>
			({
				textArea: textAreaRef.current,
				focus: () => textAreaRef?.current?.focus(),
				maxHeight,
				minHeight,
			} as unknown as HTMLTextAreaElement)
	);

	useEffect(() => {
		setTriggerAutoSize(value as string);
	}, [props?.defaultValue, value]);

	return (
		<FieldWrapper {...wrapperProps}>
			<textarea
				ref={textAreaRef}
				value={value}
				className={cn(
					'flex w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					{ ['border-warning text-warning']: status === 'warning' },
					{ ['border-destructive text-destructive']: status === 'error' },
					className
				)}
				onChange={(e) => {
					setTriggerAutoSize(e.target.value);
					onChange?.(e);
				}}
				{...props}
			/>
		</FieldWrapper>
	);
};
