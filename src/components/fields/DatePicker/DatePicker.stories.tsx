import { Meta, StoryFn } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { IDatePickerProps } from './DatePicker.props';

// Метаданные Storybook
const meta: Meta<typeof DatePicker> = {
	title: 'Fields/DatePicker',
	component: DatePicker,
	argTypes: {
		status: {
			control: 'select',
			options: ['default', 'warning', 'error'],
			description: 'Статус чекбокса (default, warning, error)',
		},
		helperText: {
			control: 'text',
			description: 'Текст подсказки',
		},
		descriptionText: {
			control: 'text',
			description: 'Описание поля',
		},
		label: {
			control: 'text',
			description: 'Текст метки чекбокса',
		},
		required: {
			control: 'boolean',
			description: 'Обязательность поля',
		},
		disabled: {
			control: 'boolean',
			description: 'Отключение чекбокса',
		},
	},
};

export default meta;

// Базовый шаблон истории
const Template: StoryFn<IDatePickerProps> = (args) => <DatePicker {...args} />;

// Истории
export const Default = Template.bind({});
Default.args = {
	label: 'Default DatePicker',
	required: false,
	helperText: 'Helper text goes here',
	descriptionText: 'Description text goes here',
	disabled: false,
};

export const Warning = Template.bind({});
Warning.args = {
	label: 'Warning DatePicker',
	status: 'warning',
	helperText: 'This is a warning message',
	required: true,
};

export const Error = Template.bind({});
Error.args = {
	label: 'Error DatePicker',
	status: 'error',
	helperText: 'This is an error message',
	descriptionText: 'Please check the input',
	required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Disabled DatePicker',
	disabled: true,
	helperText: 'You cannot interact with this checkbox',
};

export const WithLongText = Template.bind({});
WithLongText.args = {
	label: 'This is a checkbox with a very long label that demonstrates how the component handles long text',
	descriptionText: 'This is a long description to test the layout of the checkbox component with more content',
	helperText: 'Additional helper text for guidance',
};
