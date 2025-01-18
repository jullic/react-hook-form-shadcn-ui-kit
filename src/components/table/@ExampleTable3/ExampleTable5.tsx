import { FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { IExampleTable2Props } from './ExampleTable2.props';
import { ColumnSizingInfoState, ColumnSizingState, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import styles from './ExampleTable2.module.css';

import { cn } from '@/lib/utils';
import { Input } from '@/components/fields/Input';

type Item = {
	id: string;
	name: string;
	age: number;
};

const columnHelper = createColumnHelper<Item>();

const cols = [
	columnHelper.accessor('id', { header: 'Id' }),
	columnHelper.accessor('name', { header: 'Name' }),
	columnHelper.accessor('age', {
		header: 'Name',
		cell: () => (
			<div className="p-1">
				<Input />
			</div>
		),
	}),
];
const data = [
	{ id: '1', age: 1, name: 'Test 1 lorem ipsum dolor sit amet long long text check test' },
	{ id: '2', age: 1, name: 'Test 2' },
	{ id: '3', age: 1, name: 'Test 3' },
	{ id: '4', age: 1, name: 'Test 4' },
	{ id: '5', age: 1, name: 'Test 5' },
	{ id: '6', age: 1, name: 'Test 6' },
	{ id: '7', age: 1, name: 'Test 7' },
	{ id: '8', age: 1, name: 'Test 8' },
	{ id: '9', age: 1, name: 'Test 9' },
	{ id: '10', age: 1, name: 'Test 10' },
];

export const ExampleTable5: FC<IExampleTable2Props> = () => {
	const [_, forceUpdate] = useState({});

	const scrollType = useRef<'table' | 'horizontal' | 'vertical' | null>(null);
	const rootRef = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
	const verticalScrollRef = useRef<HTMLDivElement>(null);
	const horizontalScrollRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<number | null>(null);

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
			updateScrollbars();
		},
	});

	// setDefaultWidth
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

	// update height/width scrollbars
	const updateScrollbars = () => {
		setTimeout(() => {
			const header = tableRef.current?.querySelector('[data-table-component="header"]');
			const content = tableRef.current?.querySelector('[data-table-component="content"] div');
			const contentRect = content!.getBoundingClientRect();

			verticalScrollRef.current!.style.top = `${header?.clientHeight}px`;
			verticalScrollRef.current!.style.height = `${tableRef.current!.clientHeight - header!.clientHeight}px`;
			const scrollVerticalDiv = verticalScrollRef.current!.querySelector('div');
			scrollVerticalDiv!.style.height = `${contentRect.height}px`;

			const scrollHorizontalDiv = horizontalScrollRef.current!.querySelector('div');
			scrollHorizontalDiv!.style.width = `${contentRect.width}px`;
		});
	};

	// eventListeners
	useEffect(() => {
		updateScrollbars();

		tableRef.current?.addEventListener('scroll', () => {
			if (scrollType.current !== 'table' && scrollType.current !== null) {
				return;
			}
			scrollType.current = 'table';
			timeoutRef.current && clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => {
				scrollType.current = null;
			}, 100);
			verticalScrollRef!.current!.scrollTop = tableRef.current!.scrollTop;
			horizontalScrollRef!.current!.scrollLeft = tableRef.current!.scrollLeft;
		});
		tableRef.current?.addEventListener('scrollend', () => {
			scrollType.current = null;
		});
		verticalScrollRef.current?.addEventListener('scroll', () => {
			if (scrollType.current !== 'vertical' && scrollType.current !== null) {
				return;
			}
			scrollType.current = 'vertical';
			timeoutRef.current && clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => {
				scrollType.current = null;
			}, 100);
			tableRef!.current!.scrollTop = verticalScrollRef.current!.scrollTop;
		});
		verticalScrollRef.current?.addEventListener('scrollend', () => {
			scrollType.current = null;
		});
		horizontalScrollRef.current?.addEventListener('scroll', () => {
			if (scrollType.current !== 'horizontal' && scrollType.current !== null) {
				return;
			}
			scrollType.current = 'horizontal';
			timeoutRef.current && clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => {
				scrollType.current = null;
			}, 100);
			tableRef!.current!.scrollLeft = horizontalScrollRef.current!.scrollLeft;
		});
		horizontalScrollRef.current?.addEventListener('scrollend', () => {
			scrollType.current = null;
		});
	}, []);

	const headerGroups = table.getHeaderGroups();
	const rowModel = table.getRowModel();

	return (
		<div ref={rootRef} className="overflow-hidden relative">
			<div ref={tableRef} className={cn('w-full h-64 grid grid-rows-[min-content_minmax(1%,100%)] border overflow-x-scroll overflow-y-scroll', styles['hidden-scroll'])}>
				<div data-table-component="header" ref={headerRef} className={cn('max-w-full sticky top-0 bg-background !!!!!!! z-10')}>
					{headerGroups.map((row) => (
						<div style={{ width: table.getTotalSize() }} key={row.id} data-table-component="row" className="border-b min-w-full w-min flex">
							{row.headers.map((cell) => (
								<div style={{ width: cell.getSize() }} key={cell.id} data-table-component="header-cell" className={cn('', 'border-r')}>
									<div className="relative flex items-center h-full">
										<span className="block p-4 w-full">
											<span className="block text-ellipsis whitespace-nowrap text-nowrap w-full overflow-hidden">
												{cell.isPlaceholder ? null : flexRender(cell.column.columnDef.header, cell.getContext())}
											</span>
										</span>
										<div
											onMouseDown={cell.getResizeHandler()}
											onTouchStart={cell.getResizeHandler()}
											className={cn('absolute right-0 transition flex w-2 h-full hover:bg-primary cursor-ew-resize', {
												['bg-chart-2 hover:bg-chart-2']: cell.column.getIsResizing(),
											})}
										></div>
									</div>
								</div>
							))}
						</div>
					))}
				</div>
				<div data-table-component="content" ref={bodyRef} className={cn('max-w-full')}>
					<div>
						{rowModel.rows.map((row, rowI, arr) => (
							<div
								style={{ width: table.getTotalSize() }}
								key={row.id}
								data-table-component="row"
								className={cn('min-w-full w-min flex', { ['border-b']: arr.length - 1 !== rowI })}
							>
								{row.getVisibleCells().map((cell) => {
									return (
										<div style={{ width: cell.column.getSize() }} key={cell.id} data-table-component="header-cell" className={cn('', 'border-r')}>
											<span className="block p-4">
												<span className="block text-ellipsis text-nowrap w-full overflow-hidden">
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</span>
											</span>
										</div>
									);
								})}
							</div>
						))}
					</div>
				</div>
			</div>
			<div ref={verticalScrollRef} data-scroll="vertical" className="absolute right-0 w-4 overflow-y-scroll overflow-x-hidden">
				<div></div>
			</div>
			<div ref={horizontalScrollRef} data-scroll="horizontal" className="absolute bottom-0 w-full h-4 overflow-y-hidden overflow-x-scroll">
				<div className="h-4"></div>
			</div>
		</div>
	);
};
