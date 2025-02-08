import { ComponentProps, useState } from 'react';
import { DatePicker } from './components/fields/DatePicker';

import { DateTimePicker } from './components/fields/DateTimePicker';
import { Checkbox } from './components/fields/Checkbox';

import { cn } from './lib/utils';
import { PasswordInput } from './components/fields/PasswordInput';
import { Select } from './components/fields/Select';
import { useForm } from 'react-hook-form';
import { FormTextarea } from './components/@react-hook-form/FormTextarea';
import { FormSwitch } from './components/@react-hook-form/FormSwitch';
import { FormCheckbox } from './components/@react-hook-form/FormCheckbox';
import { FormDatePicker } from './components/@react-hook-form/FormDatePicker';
import { FormDateTimePicker } from './components/@react-hook-form/FormDateTimePicker';
import { FormPasswordInput } from './components/@react-hook-form/FormPasswordInput';
import { FormSelect } from './components/@react-hook-form/FormSelect';
import { RadioGroup } from './components/fields/RadioGroup';
import { Textarea } from './components/fields/Textarea';
import { FormInput } from './components/@react-hook-form/FormInput';
import { Slider } from './components/fields/Slider';
import { Switch } from './components/fields/Switch';

import { getCoreRowModel } from '@tanstack/react-table';
import { ExampleTable5 } from './components/table/@ExampleTable3/ExampleTable5';
import { FullTable } from './components/table';

const Wrap = ({ className, ...props }: ComponentProps<'div'>) => <div className={cn('p-8 flex flex-col gap-2', className)} {...props} />;

function App() {
	const [state, setState] = useState<Date | null>(null);
	const form = useForm({
		defaultValues: {
			date: new Date('2002-01-22'),
			dateTime: new Date(),
			select: 1,
			password: null,
			checkbox: true,
			input: null,
			switch: null,
			textarea: null,
			int: 1,
			float: null,
		},
	});

	return (
		<div className="h-screen w-dasfull madsax-w-[100vw] p-4">
			<Wrap>
				<FullTable
					classNames={{ table: 'max-h-[300px]' }}
					tanstackOptions={{
						enableMultiSort: true,
						columns: [
							{ accessorKey: 'id', searchable: true, editableCellType: 'boolean' },
							{
								accessorKey: 'name',
								header: 'long text name title',
								searchable: true,
							},
						],
						// columns: [
						// 	{
						// 		header: 'Name',
						// 		columns: [
						// 			{
						// 				header: 'First Name',
						// 				accessorKey: 'id',
						// 			},
						// 		],
						// 	},
						// 	{
						// 		searchable: true,
						// 		header: 'Info',
						// 		columns: [
						// 			{
						// 				header: 'Age',
						// 				accessorKey: 'name',
						// 			},
						// 		],
						// 	},
						// ],
						data: [
							{ id: 1, name: 'test' },
							{ id: 2, name: 'test long text lorem ipsum' },
							{ id: 3, name: 'test long text lorem ipsum' },
							{ id: 4, name: 'test long text lorem ipsum' },
							{ id: 5, name: 'test long text lorem ipsum' },
						],
						getCoreRowModel: getCoreRowModel(),
					}}
				/>
			</Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>

			<Wrap>
				<ExampleTable5 />
			</Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap></Wrap>
			<Wrap>
				<FormTextarea form={form} name="textarea" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" />
			</Wrap>
			<Wrap>
				<FormSwitch form={form} name="switch" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" />
			</Wrap>
			<Wrap>
				<FormInput form={form} name="input" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" />
			</Wrap>
			<Wrap>
				<FormCheckbox form={form} name="checkbox" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" />
			</Wrap>
			<Wrap>
				<FormPasswordInput form={form} name="password" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" />
			</Wrap>
			<Wrap>
				<FormSelect form={form} name="select" options={[{ label: 'one', value: 1 }]} label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" />
			</Wrap>
			<Wrap>
				<FormDatePicker form={form} name="date" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" />
			</Wrap>
			<Wrap>
				<FormDateTimePicker form={form} name="dateTime" label=" jdksadk jdkasj dkasjdkajsk djsak djaksjd aksjdksaj k" />
			</Wrap>
			<hr />
			<hr />
			<hr />
			<Wrap>
				<FormInput
					form={form}
					name="float"
					label="Field"
					inputOptions={{ type: 'float', max: 200, min: -10, maxFixed: 2 }}
					descriptionText="description"
					helperText="helper"
				/>
				<FormInput form={form} name="int" label="Field" inputOptions={{ type: 'int', max: 200, min: -500 }} />
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
