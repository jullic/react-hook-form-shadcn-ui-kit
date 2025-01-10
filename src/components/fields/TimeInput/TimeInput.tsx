/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

import { ITimeInputProps } from './TimeInput.props';
import { Input } from '../Input';
import IMask from 'imask';

export const TimeInput: FC<ITimeInputProps> = ({ mask, ...props }) => {
	return (
		<Input
			mask={{
				mask: 'HH:MM',
				blocks: {
					HH: {
						mask: IMask.MaskedRange,
						from: 0,
						to: 23,
						maxLength: 2,
					},
					MM: {
						mask: IMask.MaskedRange,
						from: 0,
						to: 59,
						maxLength: 2,
					},
				},
				lazy: false,
				autofix: true,
				...(mask as any),
			}}
			{...props}
		/>
	);
};
