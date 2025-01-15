/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { IExampleTable2Props } from './ExampleTable2.props';
import { ColumnSizingInfoState, ColumnSizingState, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn-ui/table';
import { cn } from '@/lib/utils';

type Item = {
	id: string;
	name: string;
};

const columnHelper = createColumnHelper<Item>();

const cols = [columnHelper.accessor('id', { header: 'Id' }), columnHelper.accessor('name', { header: 'Name' })];
const data = [
	{ id: '1', name: 'Test 1 lorem ipsum dolor sit amet long long text check test' },
	{ id: '2', name: 'Test 2' },
];

export const ExampleTable2: FC<IExampleTable2Props> = () => {
	const [_, forceUpdate] = useState({});
	const rootRef = useRef<HTMLDivElement>(null);
	const [defaultSize, setDefaultSize] = useState(0);
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [columnSizingInfo, setColumnSizingInfo] = useState<ColumnSizingInfoState>({} as ColumnSizingInfoState);

	const colsWithSize = useMemo(() => cols.map((col) => ({ ...col, size: col.size ?? defaultSize })), [defaultSize]);
	const table = useReactTable({
		columns: colsWithSize,
		state: {
			columnSizing,
			columnSizingInfo,
		},
		data,
		defaultColumn: {
			size: defaultSize,
			minSize: 150,
		},
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: 'onChange',
		onColumnSizingInfoChange: setColumnSizingInfo,
		onColumnSizingChange: (value) => {
			setColumnSizing(value);
		},
	});

	const headerGroups = table.getHeaderGroups();
	const headerRefs = headerGroups.map((row) => useRef<HTMLTableRowElement>(null));
	const rowModel = table.getRowModel();
	const bodyRowsRefs = rowModel.rows.map((row) => useRef<HTMLTableRowElement>(null));

	useLayoutEffect(() => {
		if (!rootRef.current) {
			return;
		}
		const rootWidth = rootRef.current.offsetWidth;
		const colWidth = rootWidth / cols.length;
		setDefaultSize(colWidth);

		setTimeout(() => {
			forceUpdate({});
		});
	}, []);

	return (
		<div ref={rootRef} className="relative w-full border rounded-lg overflow-auto grid grid-cols-[minmax(1%,100%)]">
			<Table className="relative border-collapse w-full overflow-auto z-10" style={{ width: table.getTotalSize() }}>
				<TableHeader className="w-full">
					{headerGroups.map((headerGroup, rowI) => (
						<TableRow ref={headerRefs[rowI]} key={headerGroup.id}>
							{headerGroup.headers.map((header, headerI, headers) => (
								<TableHead
									style={{ width: header.getSize() }}
									className={cn('border relative', {
										['border-t-0']: rowI === 0,
										['border-l-0']: headerI === 0,
										// ['border-r-0']: headerI === headers.length - 1,
										// ['border-b-0']: rowI === rowModel.rows.length - 1,
									})}
									key={header.id}
								>
									<div className="flex items-center h-full">
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										<div
											onMouseDown={header.getResizeHandler()}
											onTouchStart={header.getResizeHandler()}
											className={cn('absolute right-0 transform translatea-x-1/2 transition flex w-3 h-full hover:bg-primary cursor-ew-resize', {
												['bg-chart-2 hover:bg-chart-2']: header.column.getIsResizing(),
											})}
										></div>
									</div>
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{rowModel.rows?.map((row, rowI) => (
						<TableRow ref={bodyRowsRefs[rowI]} key={row.id}>
							{row.getVisibleCells().map((cell, cellI, visibleCells) => (
								<TableCell
									className={cn('border', {
										['border-l-0']: cellI === 0,
										// ['border-r-0']: cellI === visibleCells.length - 1,
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

			<Table className="absolute border-collapse w-full h-full z-0">
				<TableHeader>
					{headerRefs.map((ref, i, arr) => {
						console.log(ref.current);
						return (
							<TableRow style={{ height: ref.current?.offsetHeight }} className="relative z-0">
								<TableHead
									className={cn('border', {
										['border-t-0']: i === 0,
										['border-l-0']: true,
										['border-r-0']: true,
										// ['border-b-0']: rowI === rowModel.rows.length - 1,
									})}
								></TableHead>
							</TableRow>
						);
					})}
				</TableHeader>
				<TableBody>
					{bodyRowsRefs.map((ref, i, arr) => {
						console.log(ref.current);
						return (
							<TableRow style={{ height: ref.current?.offsetHeight }} className="relative z-0">
								<TableCell
									className={cn('border', {
										['border-l-0']: true,
										['border-r-0']: true,
										['border-b-0']: i === arr.length - 1,
									})}
								></TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};
