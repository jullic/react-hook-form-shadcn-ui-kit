import { FC, useState } from 'react';

import { IEditableCellProps } from './EditableCell.props';
import ContentEditable from 'react-contenteditable';

export const EditableCell: FC<IEditableCellProps> = ({ ...props }) => {
	const [value, setValue] = useState('');
	return (
		<ContentEditable
			{...props}
			html={value}
			onChange={(e) => console.log(e.target)}
			// onChange={onChange}
			// onBlur={() => setValue((old) => ({ value: old.value, update: true }))}
			className="data-input"
		/>
	);
};
