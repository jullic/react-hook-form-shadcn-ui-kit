import { FC } from 'react';

import { IRadioGroupProps } from './RadioGroup.props';

export const RadioGroup: FC<IRadioGroupProps> = ({ ...props }) => {
	return <div {...props}></div>;
};
