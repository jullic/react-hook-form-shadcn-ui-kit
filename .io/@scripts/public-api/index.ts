import { ensureFile, writeFile } from 'fs-extra';
import { dirname, join, resolve } from 'path';

import { getFileData } from '../../@utils';
import { replacePathForJs } from '../../@utils/replace-path-for-js';
const { log } = console;

export const publicApi = async (rootPath: string, importPaths: string[]) => {
	log(rootPath, importPaths);
	const indexPath = join(rootPath, 'index.ts');
	await ensureFile(indexPath);

	let fileData = (await getFileData(indexPath)) || '';

	for (const importPath of [...new Set(importPaths)]) {
		const importString = `export * from '${importPath}';`;
		fileData = fileData.replace(new RegExp(importString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '');
		fileData = fileData + '\n' + importString;
		fileData = fileData.replace(/\n\n/gim, '\n');
	}
	await writeFile(indexPath, fileData.trim());

	return dirname(rootPath);
};

export const fsdLayersPublicApi = async (rootPath: string, importPaths: { outputPath: string }[]) => {
	await publicApi(
		rootPath,
		importPaths.filter((path) => path.outputPath.match('.tsx')).map((item) => replacePathForJs(item.outputPath.replace(rootPath, '.'))),
	);
};

export const findAllPathFromFsdRoot = async (importPath: string) => {
	const paths: string[] = [];
	let currentPath = dirname(importPath);
	const rootPath = resolve('src');

	while (true) {
		if (currentPath === rootPath || !currentPath.match(rootPath)) {
			paths.pop();
			break;
		}
		paths.push(currentPath);
		currentPath = dirname(currentPath);
	}

	return paths;
};
