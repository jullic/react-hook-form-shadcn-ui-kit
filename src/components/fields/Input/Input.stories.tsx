// Input.stories.tsx
import { Meta, StoryFn } from '@storybook/react';

import { Input } from './Input';
import { IInputProps } from './Input.props';

const meta: Meta<IInputProps> = {
	title: 'Fields/Input',
	component: Input,
	argTypes: {
		status: {
			control: { type: 'select' },
			options: ['warning', 'error'], // Предустановленные значения
		},
		mask: { control: 'object' },
		additionalContent: { control: false },
		unit: { control: 'text' },
		disabled: { control: 'boolean' },
	},
};

const Template: StoryFn<IInputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
	label: 'Default Input',
	helperText: 'This is a default input.',
	descriptionText: 'Enter text here.',
};

export const WithUnit = Template.bind({});
WithUnit.args = {
	label: 'Input with Unit',
	helperText: 'Input with unit example.',
	unit: 'kg',
	placeholder: 'Enter value',
};

export const WithMask = Template.bind({});
WithMask.args = {
	label: 'Masked Input',
	helperText: 'Example with mask.',
	mask: {
		mask: '+{7} (000) 000-00-00',
		lazy: false,
	},
};

export const ErrorState = Template.bind({});
ErrorState.args = {
	label: 'Input with Error',
	status: 'error',
	helperText: 'This field has an error.',
};

export const WarningState = Template.bind({});
WarningState.args = {
	label: 'Input with Warning',
	status: 'warning',
	helperText: 'This field has a warning.',
};

export default meta;
