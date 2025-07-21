import { useState } from "react";

export default function Menu({ items }) {
    // Create a new array where the active item is always in the middle
	const [active, setActive] = useState(0);
	const orderedItems = [
		items[(active - 1 + items.length) % items.length],
		items[active],
		items[(active + 1) % items.length],
	];

	const handleScroll = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.deltaY > 0) {
			setActive((prevactive) => (prevactive + 1) % items.length);
		} else {
			setActive(
				(prevactive) => (prevactive - 1 + items.length) % items.length
			);
		}
	};

	function getMenuItemClass(index) {
		if (index === 0) {
			return "top transform";
		} else if (index === 1) {
			return "active";
		} else if (index === 2) {
			return "bottom";
		} else {
			return "hidden";
		}
	};

	return (
		<div onWheel={handleScroll} className="menu grid place-content-center overflow-hidden p-16
                                               text-[3.5em] md:text-[5em] tracking-widest leading-tight">
			{orderedItems.map((item, index) => (
				<div key={item} className={`${getMenuItemClass(index)} w-max transition-transform ease-out-quint duration-1000`}>
					{item}
				</div>
			))}
		</div>
	);
}