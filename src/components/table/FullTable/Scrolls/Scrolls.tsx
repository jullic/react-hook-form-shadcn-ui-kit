import { RefObject } from 'react';

export const Scrolls = ({
	verticalScrollRef,
	horizontalScrollRef,
}: {
	verticalScrollRef: RefObject<HTMLDivElement | null>;
	horizontalScrollRef: RefObject<HTMLDivElement | null>;
}) => {
	return (
		<>
			<div ref={verticalScrollRef} data-scroll="vertical" className="absolute right-0 w-4 overflow-y-scroll overflow-x-hidden">
				<div className="w-4"></div>
			</div>
			<div ref={horizontalScrollRef} data-scroll="horizontal" className="absolute bottom-0 w-full h-4 overflow-y-hidden overflow-x-scroll">
				<div className="h-4"></div>
			</div>
		</>
	);
};
