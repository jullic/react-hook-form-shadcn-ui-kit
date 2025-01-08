import { Input } from './components/fields/Input';

function App() {
	return (
		<div className='h-screen bg-sky-600 w-screen p-16'>
			<Input
				required
				label='test'
				descriptionText='test description'
				helperText='Incorrect field'
				status='warning'
				unit='ters'
				disabled
			/>
		</div>
	);
}

export default App;
