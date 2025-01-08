import { IConfig } from 'io-cli-templater/build/@types';
import { join } from 'path';

import { publicApi } from '../../@scripts/public-api';

export const Config: IConfig = {
	inputArgs: [{ name: 'IO_COMPONENT_NAME', message: 'Название сущности', replace: true }],
	outputPathFromRoot: 'src/entities',
	additionalArgs: [
		{ name: 'IO_COMPONENT_NAME_KEBAB', replace: true, value: '__~~~IO_COMPONENT_NAME' },
		{ name: 'IO_COMPONENT_NAME_CAMEL', replace: true, value: '$~IO_COMPONENT_NAME' },
	],
	actions: {
		after: [
			async ({ additionalArgs, outputRootPath }) => {
				const IO_COMPONENT_NAME_KEBAB = additionalArgs.find((arg) => arg.name === 'IO_COMPONENT_NAME_KEBAB')?.value || '';
				await publicApi(join(outputRootPath, IO_COMPONENT_NAME_KEBAB), ['./ui']);
			},
		],
	},
};

export default Config;
