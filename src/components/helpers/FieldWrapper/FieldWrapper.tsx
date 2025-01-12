import { FC } from 'react';

import { IFieldWrapperProps } from './FieldWrapper.props';
import { FieldLabel } from '../FieldLabel';
import { FieldDescription } from '../FieldDescription';
import { FieldHelperText } from '../FieldHelperText';

export const FieldWrapper: FC<IFieldWrapperProps> = ({ children, descriptionText, helperText, status, label, classNames, required }) => {
	return (
		<FieldLabel required={required} label={label} status={status} className={classNames?.label}>
			<FieldHelperText status={status} helperText={helperText} className={classNames?.helperText}>
				<FieldDescription descriptionText={descriptionText} className={classNames?.description}>
					{children}
				</FieldDescription>
			</FieldHelperText>
		</FieldLabel>
	);
};
