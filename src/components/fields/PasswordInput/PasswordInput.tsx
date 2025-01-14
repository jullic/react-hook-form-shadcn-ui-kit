import { FC, useState } from 'react';

import { IPasswordInputProps } from './PasswordInput.props';
import { Input } from '../Input';
import { Button } from '@/components/shadcn-ui/button';
import { Eye, EyeClosed } from 'lucide-react';

const PasswordInput: FC<IPasswordInputProps> = ({ ...props }) => {
	const [isShow, setIsShow] = useState(false);

	return (
		<Input
			{...props}
			type={isShow ? undefined : 'password'}
			className="pr-12"
			additionalContent={
				<span className="absolute bottom-0 right-0">
					<Button disabled={props.disabled} onClick={() => setIsShow((p) => !p)} variant="link">
						{isShow ? <Eye /> : <EyeClosed />}
					</Button>
				</span>
			}
		/>
	);
};
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
