import { useState } from 'react';
import { DatePicker } from './components/fields';

function App() {
	const [state, setState] = useState(null);

	return (
		<div className='h-screen bg-background w-screen p-16'>
			{/* <DateInput value={state} mask={{ onAccept: (value) => setState(value) }} /> */}
			<DatePicker value={state} onChange={(e) => setState(e)} />
		</div>
	);
}

export default App;
