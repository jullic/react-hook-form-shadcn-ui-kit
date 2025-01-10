/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

import { IDateInputProps } from './DateInput.props';
import { Input } from '../Input';

export const DateInput: FC<IDateInputProps> = ({ mask, ...props }) => {
	return <Input mask={{ mask: Date, lazy: false, autofix: true, ...(mask as any) }} {...props} />;
};
