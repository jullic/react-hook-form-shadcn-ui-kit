import { useState } from 'react';
import { DatePicker, DateTimePicker, TimeInput } from './components/fields';

function App() {
	const [state, setState] = useState(null);
	const [date, setDate] = useState<Date | null>(new Date());

	console.log(date?.toLocaleString());

	return (
		<div className='h-screen bg-background w-screen p-4'>
			{/* <DateInput value={state} mask={{ onAccept: (value) => setState(value) }} /> */}
			<DatePicker value={state} onChange={(e) => setState(e)} />
			<TimeInput className='mb-10' />
			<DateTimePicker value={date} onChange={setDate} />
		</div>
	);
}

export default App;
