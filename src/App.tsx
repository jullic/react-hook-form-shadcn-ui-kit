import { ComponentProps, useState } from 'react';
import { DatePicker } from './components/fields/DatePicker';

import { DateTimePicker } from './components/fields/DateTimePicker';
import { Checkbox } from './components/fields/Checkbox';
import { RadioGroup, Slider, Switch, Textarea } from './components/fields';
import { cn } from './lib/utils';
import { Input } from './components/fields/Input';
import { PasswordInput } from './components/fields/PasswordInput';
import { Select } from './components/fields/Select';

const Wrap = ({ className, ...props }: ComponentProps<'div'>) => <div className={cn('p-4', className)} {...props} />;

function App() {
	const [state, setState] = useState<Date | null>(null);

	return (
		<div className='h-screen w-screen p-4'>
			<Wrap>
				<Input label='Field' />
			</Wrap>
			<Wrap>
				<PasswordInput label='Field' />
			</Wrap>
			<Wrap>
				<Checkbox label='Field' />
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
				<Select label='Field' />
			</Wrap>
			<Wrap>
				<Slider label='Field' />
			</Wrap>
			<Wrap>
				<Switch label='Field' />
			</Wrap>
			<Wrap>
				<Textarea label='Field' />
			</Wrap>
		</div>
	);
}

export default App;
