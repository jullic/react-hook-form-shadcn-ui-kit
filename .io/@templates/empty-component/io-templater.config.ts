import { IConfig } from 'io-cli-templater/build/@types';

import { findAllPathFromFsdRoot, publicApi } from '../../@scripts/public-api';
import { replacePathForJs } from '../../@utils/replace-path-for-js';

export const Config: IConfig = {
	inputArgs: [
		{ name: 'IO_COMPONENT_NAME', message: 'Название компонента', replace: true },
		{ name: 'IO_PATH', message: 'Путь', defaultValue: 'src/components/@react-hook-form' },
	],
	additionalArgs: [
		{ name: 'IO_COMPONENT_NAME_KEBAB', replace: true, value: '__~~~IO_COMPONENT_NAME' },
		{ name: 'IO_COMPONENT_NAME_CAMEL', replace: true, value: '$~IO_COMPONENT_NAME' },
	],
	outputPathFromRoot: ({ inputArgs }) => `${inputArgs.IO_PATH?.value}`,
	actions: {
		after: [
			async ({ paths }) => {
				for (const path of paths.filter((path) => path.outputPath.match('.tsx'))) {
					const indexPaths = await findAllPathFromFsdRoot(path.outputPath);
					for (let i = 1; i < indexPaths.length; i++) {
						await publicApi(indexPaths[i], [replacePathForJs(indexPaths[i - 1]).replace(indexPaths[i], '.')]);
					}
				}
			},
		],
	},
};

export default Config;
