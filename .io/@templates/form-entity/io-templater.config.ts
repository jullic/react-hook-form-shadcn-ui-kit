import { IConfig } from 'io-cli-templater/build/@types';
import { join } from 'path';

import { findAllPathFromFsdRoot, publicApi } from '../../@scripts/public-api';

export const Config: IConfig = {
	inputArgs: [
		{ name: 'IO_FORM_NAME', message: 'Название формы', replace: true },
		{ name: 'IO_PATH', message: 'Путь IO_PATH (src/entities/{IO_PATH}/lib)' },
	],
	outputPathFromRoot: ({ inputArgs }) => `src/entities/${inputArgs.IO_PATH?.value}/lib`,
	additionalArgs: [
		{ name: 'IO_FORM_NAME_KEBAB', replace: true, value: '__~~~IO_FORM_NAME' },
		{ name: 'IO_FORM_NAME_CAMEL', replace: true, value: '$~IO_FORM_NAME' },
	],
	actions: {
		after: [
			async ({ additionalArgs, outputRootPath, inputArgs }) => {
				const IO_FORM_NAME_KEBAB = additionalArgs.find((arg) => arg.name === 'IO_FORM_NAME_KEBAB')?.value || '';
				await publicApi(join(outputRootPath), [`./form-${IO_FORM_NAME_KEBAB}`]);
			},
		],
	},
};

export default Config;
