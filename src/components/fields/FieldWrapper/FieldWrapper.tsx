import { FC } from 'react';

import { IFieldWrapperProps } from './FieldWrapper.props';
import { FieldLabel } from '../FieldLabel';
import { FieldDescription } from '../FieldDescription';
import { FieldHelperText } from '../FieldHelperText';

export const FieldWrapper: FC<IFieldWrapperProps> = ({ children, descriptionText, helperText, status, label, required }) => {
	return (
		<FieldLabel required={required} label={label} status={status}>
			<FieldHelperText status={status} helperText={helperText}>
				<FieldDescription descriptionText={descriptionText}>{children}</FieldDescription>
			</FieldHelperText>
		</FieldLabel>
	);
};
