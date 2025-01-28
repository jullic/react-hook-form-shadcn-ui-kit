import { columns } from '../@ExampleTable/ExampleTable copy';
import {
	ColumnSizingState,
	ColumnSizingInfoState,
	useReactTable,
	RowData,
	getFilteredRowModel,
	ColumnFiltersState,
	ColumnDef,
	getSortedRowModel,
	SortingState,
	PaginationTableState,
} from '@tanstack/react-table';
import { useState, useRef, useMemo, useLayoutEffect, useEffect } from 'react';
import { TanstackOptions } from './MaxTable.props';

export const useTable = <TData extends RowData>(tanstackOptions: TanstackOptions<TData>) => {
	const { manualFiltering = true, manualPagination = true, manualSorting = true } = tanstackOptions;
	const [_, forceUpdate] = useState({});

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([{ id: 'name', value: ['text'] }]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationTableState['pagination']>({ pageIndex: 1, pageSize: 25 });

	const scrollType = useRef<'table' | 'horizontal' | 'vertical' | null>(null);
	const rootRef = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLDivElement>(null);
	const verticalScrollRef = useRef<HTMLDivElement>(null);
	const horizontalScrollRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<number | null>(null);

	const [defaultSize, setDefaultSize] = useState(0);
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [columnSizingInfo, setColumnSizingInfo] = useState<ColumnSizingInfoState>({} as ColumnSizingInfoState);

	const colsWithSize = useMemo(() => {
		// TODO: сделать для остальных accessors
		return tanstackOptions.columns.map((col) => {
			const isSearchable = col.searchable;
			const cols = 'columns' in col ? col.columns || [] : [];
			const columns: ColumnDef<TData, any>[] = [...cols];
			const accessorKey = 'accessorKey' in col ? col.accessorKey : '';
			if (isSearchable) {
				columns.push({ accessorKey, header: () => <input /> });
			}
			return { ...col, size: col.size ?? defaultSize, columns: columns.length ? columns : undefined };
		});
	}, [defaultSize, tanstackOptions.columns]);

	console.log(sorting);

	const table = useReactTable({
		columnResizeMode: 'onChange',
		onColumnSizingInfoChange: setColumnSizingInfo,
		onColumnSizingChange: (value) => {
			setColumnSizing(value);
			updateScrollbars();
		},
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		...tanstackOptions,
		state: {
			columnSizing,
			columnSizingInfo,
			columnFilters,
			sorting,
			pagination,
			...tanstackOptions.state,
		},
		defaultColumn: {
			size: defaultSize,
			minSize: 150,
			...tanstackOptions.defaultColumn,
		},
		manualFiltering,
		manualSorting,
		manualPagination,
		columns: colsWithSize,
	});

	// setDefaultWidth
	useLayoutEffect(() => {
		if (!rootRef.current) {
			return;
		}
		const rootWidth = rootRef.current.offsetWidth;
		const colWidth = rootWidth / tanstackOptions.columns.length;
		setDefaultSize(colWidth);

		setTimeout(() => {
			forceUpdate({});
		});
	}, [tanstackOptions.columns]);

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

		const tableScrollHandler = () => {
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
		};
		const verticalScrollHandler = () => {
			if (scrollType.current !== 'vertical' && scrollType.current !== null) {
				return;
			}
			scrollType.current = 'vertical';
			timeoutRef.current && clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => {
				scrollType.current = null;
			}, 100);
			tableRef!.current!.scrollTop = verticalScrollRef.current!.scrollTop;
		};
		const horizontalScrollHandler = () => {
			if (scrollType.current !== 'horizontal' && scrollType.current !== null) {
				return;
			}
			scrollType.current = 'horizontal';
			timeoutRef.current && clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => {
				scrollType.current = null;
			}, 100);
			tableRef!.current!.scrollLeft = horizontalScrollRef.current!.scrollLeft;
		};
		const scrollEndHandler = () => {
			scrollType.current = null;
		};

		tableRef.current?.addEventListener('scroll', tableScrollHandler);
		tableRef.current?.addEventListener('scrollend', scrollEndHandler);

		verticalScrollRef.current?.addEventListener('scroll', verticalScrollHandler);
		verticalScrollRef.current?.addEventListener('scrollend', scrollEndHandler);

		horizontalScrollRef.current?.addEventListener('scroll', horizontalScrollHandler);
		horizontalScrollRef.current?.addEventListener('scrollend', scrollEndHandler);

		return () => {
			tableRef.current?.removeEventListener('scroll', tableScrollHandler);
			tableRef.current?.removeEventListener('scrollend', scrollEndHandler);

			verticalScrollRef.current?.removeEventListener('scroll', verticalScrollHandler);
			verticalScrollRef.current?.removeEventListener('scrollend', scrollEndHandler);

			horizontalScrollRef.current?.removeEventListener('scroll', horizontalScrollHandler);
			horizontalScrollRef.current?.removeEventListener('scrollend', scrollEndHandler);
		};
	}, []);

	return { table, rootRef, tableRef, verticalScrollRef, horizontalScrollRef };
};
