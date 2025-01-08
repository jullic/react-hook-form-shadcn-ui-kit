import { FC } from 'react';

import { ISelectProps } from './Select.props';

export const Select: FC<ISelectProps> = ({ ...props }) => {
	return <div {...props}></div>;
};
