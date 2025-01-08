import { IConfig } from 'io-cli-templater/build/@types';
import { join } from 'path';

import { publicApi } from '../../@scripts/public-api';

export const Config: IConfig = {
	inputArgs: [
		{ name: 'IO_COMPONENT_NAME', message: 'Название компонента', replace: true },
		{ name: 'IO_FEATURE_NAME', message: 'Название фичи', replace: true },
	],
	outputPathFromRoot: 'src/features',
	additionalArgs: [
		{ name: 'IO_COMPONENT_NAME_KEBAB', replace: true, value: '__~~~IO_COMPONENT_NAME' },
		{ name: 'IO_COMPONENT_NAME_CAMEL', replace: true, value: '$~IO_COMPONENT_NAME' },
		{ name: 'IO_FEATURE_NAME_KEBAB', replace: true, value: '__~~~IO_FEATURE_NAME' },
	],
	actions: {
		after: [
			async ({ additionalArgs, outputRootPath }) => {
				const IO_FEATURE_NAME_KEBAB = additionalArgs.find((arg) => arg.name === 'IO_FEATURE_NAME_KEBAB')?.value || '';
				const IO_COMPONENT_NAME_CAMEL = additionalArgs.find((arg) => arg.name === 'IO_COMPONENT_NAME_CAMEL')?.value || '';
				await publicApi(join(outputRootPath, IO_FEATURE_NAME_KEBAB, 'ui'), [`./${IO_COMPONENT_NAME_CAMEL}`]);
			},
		],
	},
};

export default Config;
