import { cn } from '@/lib/utils';
import { flexRender, Header, RowData } from '@tanstack/react-table';
import { Sort } from '../Sort/Sort';
import { Resizer } from '../Resizer/Resizer';

export const HeaderCell = <TData extends RowData>({ headerCell, className, canSort }: { headerCell: Header<TData, unknown>; className: string; canSort: boolean }) => {
	const meta = headerCell.column.columnDef.meta || {};
	const withoutPadding = 'withoutPadding' in meta ? meta.withoutPadding : false;

	return (
		<div style={{ width: headerCell.getSize() }} key={headerCell.id} data-table-component={'header-cell'} className={cn(className)}>
			<div className="relative flex items-center h-full">
				<span className={cn('flex w-full items-center', { ['p-4']: !withoutPadding })}>
					<span className="block text-ellipsis whitespace-nowrap text-nowrap w-full overflow-hidden text-muted-foreground">
						{headerCell.isPlaceholder ? null : flexRender(headerCell.column.columnDef.header, headerCell.getContext())}
					</span>
					<Sort canSort={canSort} headerCell={headerCell} />
				</span>
				<Resizer headerCell={headerCell} />
			</div>
		</div>
	);
};
