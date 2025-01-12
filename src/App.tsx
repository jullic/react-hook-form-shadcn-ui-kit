import { ComponentProps, useState } from 'react';
import { DatePicker } from './components/fields/DatePicker';

import { DateTimePicker } from './components/fields/DateTimePicker';
import { Checkbox } from './components/fields/Checkbox';
import { RadioGroup, Slider, Switch, Textarea } from './components/fields';
import { cn } from './lib/utils';
import { Input } from './components/fields/Input';
import { PasswordInput } from './components/fields/PasswordInput';
import { Select } from './components/fields/Select';
import { FormCheckbox, FormDatePicker, FormDateTimePicker, FormInput, FormPasswordInput, FormSelect, FormSwitch, FormTextarea } from './components/@react-hook-form';
import { useForm } from 'react-hook-form';

const Wrap = ({ className, ...props }: ComponentProps<'div'>) => <div className={cn('p-4', className)} {...props} />;

function App() {
	const [state, setState] = useState<Date | null>(null);
	const form = useForm({
		defaultValues: { date: new Date('2002-01-22'), dateTime: new Date(), select: 1, password: null, checkbox: true, input: null, switch: null, textarea: null },
	});

	return (
		<div className="h-screen w-screen p-4">
			<Wrap>
				<FormTextarea form={form} name="textarea" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" disabled />
			</Wrap>
			<Wrap>
				<FormSwitch form={form} name="switch" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" disabled />
			</Wrap>
			<Wrap>
				<FormInput form={form} name="input" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" disabled />
			</Wrap>
			<Wrap>
				<FormCheckbox form={form} name="checkbox" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" disabled />
			</Wrap>
			<Wrap>
				<FormPasswordInput form={form} name="password" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" disabled />
			</Wrap>
			<Wrap>
				<FormSelect form={form} name="select" options={[{ label: 'one', value: 1 }]} label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" disabled />
			</Wrap>
			<Wrap>
				<FormDatePicker form={form} name="date" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" disabled />
			</Wrap>
			<Wrap>
				<FormDateTimePicker form={form} name="dateTime" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" disabled />
			</Wrap>
			<hr />
			<hr />
			<hr />
			<Wrap>
				<Input label="Field" />
			</Wrap>
			<Wrap>
				<PasswordInput label="Field" />
			</Wrap>
			<Wrap>
				<Checkbox label="Field" />
			</Wrap>
			<Wrap>
				<DatePicker dateInputProps={{ label: 'Field' }} />
			</Wrap>
			<Wrap>
				<DateTimePicker disabled value={state} onChange={setState} dateInputProps={{ label: 'Field' }} />
			</Wrap>
			<Wrap>
				<RadioGroup />
			</Wrap>
			<Wrap>
				<Select label="Field" />
			</Wrap>
			<Wrap>
				<Slider label="Field" />
			</Wrap>
			<Wrap>
				<Switch label="Field" />
			</Wrap>
			<Wrap>
				<Textarea label="Field" />
			</Wrap>
		</div>
	);
}

export default App;
