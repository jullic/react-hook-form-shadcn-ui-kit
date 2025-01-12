import { Calendar } from "@/components/ui/calendar";
import { DateInput } from "../DateInput";
import { IField } from "@/types/field";

export interface IDatePickerProps extends IField {
	disabled?: boolean;
	dateInputProps?: Parameters<typeof DateInput>[0];
	calendarProps?: Omit<Parameters<typeof Calendar>[0], "onSelect">;
	value?: Date | null;
	onChange?: (value: Date | null) => void;
}
