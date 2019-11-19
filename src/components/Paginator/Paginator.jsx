import React from 'react';
import { Link } from 'react-router-dom';
import s from './Paginator.module.css';

function Paginator(props) {
	let { itemsCount = 1, pageSize = 3, portionSize = 2, currentPage } = props;

	let pagesCount = Math.ceil(itemsCount / pageSize);
	let leftNumber = currentPage - portionSize;
	let rightNumber = currentPage + portionSize;

	let pages = Array(pagesCount)
		.fill()
		.map((v, i) => i + 1);

	let paginationButtons = (
		<ul className={s.pagination}>
			<li>
				<Link hidden={!(currentPage > 1)} to={`/page/${currentPage - 1}`}>
					&laquo;
				</Link>
			</li>
			{pages
				.filter(p => p >= leftNumber && p <= rightNumber)
				.map(p => (
					<li key={p}>
						<Link to={`/page/${p}`} className={currentPage === p ? s.active : ''}>
							{p}
						</Link>
					</li>
				))}
			<li>
				<Link hidden={currentPage >= pagesCount} to={`/page/${currentPage + 1}`}>
					&raquo;
				</Link>
			</li>
		</ul>
	);

	return pagesCount > 1 ? paginationButtons : '';
}

export default Paginator;
