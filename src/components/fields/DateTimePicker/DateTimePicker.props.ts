import { DateInput } from '../DateInput';
import { Calendar } from '@/components/ui/calendar';
import { TimeInput } from '../TimeInput';

export interface IDateTimePickerProps {
	dateInputProps?: Parameters<typeof DateInput>[0];
	timeInputProps?: Parameters<typeof TimeInput>[0];
	disabled?: boolean;
	calendarProps?: Omit<Parameters<typeof Calendar>[0], 'onSelect'>;
	value?: Date | null;
	onChange?: (value: Date | null) => void;
}
