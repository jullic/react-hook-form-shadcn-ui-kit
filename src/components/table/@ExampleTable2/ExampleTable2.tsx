import { FC, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { IExampleTable2Props } from './ExampleTable2.props';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn-ui/table';
import { cn } from '@/lib/utils';

type Item = {
	id: string;
	name: string;
};

const columnHelper = createColumnHelper<Item>();

const cols = [columnHelper.accessor('id', { header: 'Id' }), columnHelper.accessor('name', { header: 'Name' })];
const data = [
	{ id: '1', name: 'Test 1' },
	{ id: '2', name: 'Test 2' },
];

export const ExampleTable2: FC<IExampleTable2Props> = () => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [defaultSize, setDefaultSize] = useState(0);

	const colsWithSize = useMemo(() => cols.map((col) => ({ ...col, size: col.size ?? defaultSize })), [defaultSize]);
	const table = useReactTable({
		columns: colsWithSize,
		data,
		defaultColumn: {
			size: defaultSize,
			minSize: 150,
		},
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: 'onChange',
	});

	const headerGroups = table.getHeaderGroups();
	// const headerRefs = headerGroups.map((row) => useRef<HTMLTableRowElement>(null));
	const rowModel = table.getRowModel();

	useLayoutEffect(() => {
		if (!rootRef.current) {
			return;
		}
		const rootWidth = rootRef.current.offsetWidth;
		const colWidth = rootWidth / cols.length;
		setDefaultSize(colWidth);
	}, []);

	return (
		<div ref={rootRef} className="relative w-full border rounded-lg overflow-auto">
			<Table className="relative border-collapse w-full overflow-auto z-10" style={{ width: table.getTotalSize() }}>
				<TableHeader className="w-full">
					{headerGroups.map((headerGroup, rowI) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header, headerI, headers) => (
								<TableHead
									style={{ width: header.getSize() }}
									className={cn('border', {
										['border-t-0']: rowI === 0,
										['border-l-0']: headerI === 0,
										['border-r-0']: headerI === headers.length - 1,
										// ['border-b-0']: rowI === rowModel.rows.length - 1,
									})}
									key={header.id}
								>
									<div className="flex items-center h-full">
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										<div
											onMouseDown={header.getResizeHandler()}
											onTouchStart={header.getResizeHandler()}
											className="flex ml-auto w-2 h-full bg-red-400 cursor-pointer"
										></div>
									</div>
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{rowModel.rows?.map((row, rowI) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell, cellI, visibleCells) => (
								<TableCell
									className={cn('border', {
										['border-l-0']: cellI === 0,
										['border-r-0']: cellI === visibleCells.length - 1,
										['border-b-0']: rowI === rowModel.rows.length - 1,
									})}
									key={cell.id}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
