import { cn } from '@/lib/utils';
import { IFullTableProps } from './FullTable.props';
import { RowData } from '@tanstack/react-table';
import styles from './FullTable.module.css';
import { useTable } from './useTable';
import { HeaderCell } from './HeaderCell/HeaderCell';
import { BodyCell } from './BodyCell/BodyCell';
import { Scrolls } from './Scrolls/Scrolls';

const defaultClassNames = {
	root: cn('overflow-hidden relative'),
	table: cn('w-full grid grid-rows-[min-content_minmax(1%,100%)] border rounded-lg overflow-x-scroll overflow-y-scroll', styles['hidden-scroll']),
	tableHeader: cn('max-w-full sticky top-0 bg-background z-10'),
	tableHeaderRow: cn('border-b min-w-full w-min flex'),
	tableHead: cn('header-cell text-muted-foreground border-r'),
	tableBody: cn('max-w-full'),
	tableBodyRow: cn('min-w-full w-min flex'),
	tableBodyCell: cn('flex justify-center items-center border-r'),
};

export const FullTable = <TData extends RowData>({ tanstackOptions, headerCellPosition, resizable, classNames, ...props }: IFullTableProps<TData>) => {
	const { horizontalScrollRef, rootRef, table, tableRef, verticalScrollRef } = useTable(tanstackOptions);

	const headerGroups = table.getHeaderGroups();
	const rowModel = table.getRowModel();

	return (
		<div ref={rootRef} className={cn(defaultClassNames.root, classNames?.root)}>
			<div ref={tableRef} className={cn(defaultClassNames.table, classNames?.table)}>
				<div data-table-component="header" className={cn(defaultClassNames.tableHeader, classNames?.tableHeader)}>
					{headerGroups.map((row, rowI) => (
						<div
							style={{ width: table.getTotalSize() }}
							key={row.id}
							data-table-component="row"
							className={cn(defaultClassNames.tableHeaderRow, classNames?.tableHeaderRow)}
						>
							{row.headers.map((headerCell) => (
								<HeaderCell
									canSort={rowI == headerGroups.length - 1}
									className={cn(defaultClassNames.tableHead, classNames?.tableHead)}
									headerCell={headerCell}
									key={headerCell.id}
								/>
							))}
						</div>
					))}
				</div>
				<div data-table-component="content" className={cn(defaultClassNames.tableBody, classNames?.tableBody)}>
					<div>
						{rowModel.rows.map((row, rowI, arr) => (
							<div
								style={{ width: table.getTotalSize() }}
								key={row.id}
								data-table-component="row"
								className={cn(defaultClassNames.tableBodyRow, classNames?.tableBodyRow, { ['border-b']: arr.length - 1 !== rowI })}
							>
								{row.getVisibleCells().map((cell) => {
									return <BodyCell cell={cell} key={cell.id} className={cn(defaultClassNames.tableBodyCell, classNames?.tableBodyCell)} />;
								})}
							</div>
						))}
					</div>
				</div>
			</div>
			<Scrolls horizontalScrollRef={horizontalScrollRef} verticalScrollRef={verticalScrollRef} />
		</div>
	);
};
