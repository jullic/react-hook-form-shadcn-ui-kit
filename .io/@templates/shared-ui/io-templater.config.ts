import { IConfig } from 'io-cli-templater/build/@types';
import { dirname, join } from 'path';

import { publicApi } from '../../@scripts/public-api';
import { replacePathForJs } from '../../@utils/replace-path-for-js';

export const Config: IConfig = {
	inputArgs: [
		{ name: 'IO_COMPONENT_NAME', message: 'Название компонента', replace: true },
		{ name: 'ADDITIONAL_PATH', message: 'Дополнительный путь' },
	],
	outputPathFromRoot: ({ inputArgs }) =>
		`src/shared/ui` + (inputArgs['ADDITIONAL_PATH']?.value ? `/${inputArgs['ADDITIONAL_PATH']?.value}` : ''),
	additionalArgs: [
		{ name: 'IO_COMPONENT_NAME_KEBAB', replace: true, value: '__~~~IO_COMPONENT_NAME' },
		{ name: 'IO_COMPONENT_NAME_CAMEL', replace: true, value: '$~IO_COMPONENT_NAME' },
	],
	actions: {
		after: [
			async ({ outputRootPath, paths }) => {
				// await publicApi(
				// 	join(outputRootPath),
				// 	paths.map((path) => replacePathForJs(dirname(path.outputPath).replace(outputRootPath, '.'))),
				// );
			},
		],
	},
};

export default Config;
