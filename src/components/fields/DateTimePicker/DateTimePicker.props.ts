import { DateInput } from "../DateInput";
import { Calendar } from "@/components/ui/calendar";
import { TimeInput } from "../TimeInput";
import { IField } from "@/types/field";

export interface IDateTimePickerProps extends IField {
	dateInputProps?: Parameters<typeof DateInput>[0];
	timeInputProps?: Parameters<typeof TimeInput>[0];
	calendarProps?: Omit<Parameters<typeof Calendar>[0], "onSelect">;
	value?: Date | null;
	onChange?: (value: Date | null) => void;
}
