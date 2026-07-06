import pkg from '../package.json';

function hash(input: string): string {
	return `${input
		.split('')
		.reduce((acc, i) => acc + (i.charCodeAt(0) || 0), 0)
		.toString(36)}${input.length.toString(36)}`;
}

export function convert(text: string, {
	preamble = true,
	title = '',
	preambleUrl = '',
	colorText = '#FFF',
	colorBg = '#000',
	colorAccent = '#FFC',
	indent = /(^\t*)(.*$)/,
	highlight = /!!!/,
}: {
	/** if `true`, output includes a short preamble */
	preamble?: boolean;
	/** if provided, title referenced in document head and preamble */
	title?: string;
	/** if provided, link wrapping title in preamble */
	preambleUrl?: string;
	colorText?: string;
	colorBg?: string;
	colorAccent?: string;
	/** regex used to split text */
	indent?: RegExp;
	/** regex used to determine highlighted lines */
	highlight?: RegExp;
} = {}): string {
	const lines = text
		.trim()
		.split(/[\r\n]+/)
		.filter((i) => i.trim());

	type Hint = { summary: string; detail: Hint[] };
	const hints: Hint[] = [{ summary: '', detail: [] }];
	const stack = [hints[0]];

	const tail = <T>(a: T[]): T => a[a.length - 1];

	// eslint-disable-next-line no-restricted-syntax
	for (const l of lines) {
		const [, tabs, hint] = l.split(indent);
		const depth = tabs.length + 1;
		if (depth > stack.length) {
			stack.push(tail(tail(stack).detail));
		}
		while (depth < stack.length) {
			stack.pop();
		}
		tail(stack).detail.push({ summary: hint, detail: [] });
	}
	const ids = new Set();

	function getId(input: string): string {
		let extra = 0;
		let id = '';
		while (!id && extra < 100) {
			id = `h${hash(`${input}${extra}`)}`;
			if (ids.has(id)) {
				id = '';
				++extra;
			}
		}
		ids.add(id);
		return id;
	}

	/* eslint-disable indent */
	const renderHint = (hint: (typeof hints)[number], depth: number): string => {
		const t = '\t'.repeat(depth);
		return hint.detail.length > 0
			? `
${t}<details id="${getId(`${hint.summary}.${depth}`)}">
${t}	<summary>${hint.summary}${highlight?.exec(hint.summary) ? '<span class="highlight"></span>' : ''}</summary>
${t}	<ul>${hint.detail
				.map(
					(d) => `
${t}		<li>${renderHint(d, depth + 3)}
${t}		</li>`,
				)
				.join('')}
${t}	</ul>
${t}</details>`
		: `
${t}${hint.summary}`;
	};
	/* eslint-enable indent */

	return `
<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<title>${[title, 'Hints'].filter((i) => i).join(' | ')}</title>
	<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
	<meta name="theme-color" content="${colorBg}">
	<meta name="generator" content="${pkg.name} v${pkg.version}" />

	<style>
		html {
			--bg: ${colorBg};
			--text: ${colorText};
			--accent: ${colorAccent};
			background: var(--bg);
			color: var(--text);
			font-family: 'font', 'Courier New', Courier, monospace;
			scrollbar-gutter: stable;
		}

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
			margin-inline-start: 0.5em;
		}

		li {
			font-style: italic;
			min-width: 10em;
		}

		details {
			font-style: initial;
			border: solid 1px transparent;
		}

		details[open] {
			border-left-color: var(--accent);
			border-top-color: var(--accent);
		}

		summary {
			cursor: pointer;
			color: var(--accent);
			padding: 0.25rem;
		}

		summary:has(> .highlight) {
			background-color: rgba(from var(--text) r g b / 0.5);
			color: var(--bg);
		}

		a {
			color: var(--accent);
		}

		summary:hover,
		summary:focus {
			color: inherit;
			background-color: rgba(from var(--text) r g b / 0.2);
		}

		details i,
		details q {
			font-weight: bold;
		}
	</style>
</head>

<body>
	<h1>${[title, 'Hints'].filter((i) => i).join(' | ')}</h1>

	${preamble ? `<p>This is a list of hints${title ? ` for ${preambleUrl ? `<a href="${preambleUrl}">${title}</a>` : title}` : ''}. These hints start out vague and get more specific the deeper you expand in order to try to help you get unstuck while trying to avoid spoiling full solutions.</p>` : ''}

	${hints[0].detail.length > 1 ? `<ul>` : ''}
	${hints[0].detail.map(i => hints[0].detail.length > 1 ? `\t<li>${renderHint(i, 3)}\n\t\t</li>` : renderHint(i, 1)).join('\n\t')}
	${hints[0].detail.length > 1 ? `</ul>` : ''}

	<script>
		let openingA = false;
		let openingB = false;
		function openHintsFromHash(event) {
			if (openingB) return;
			openingA = true;
			const state = (event ? new URL(event.newURL).hash : location.hash).split('|').filter(i => i && i !== '#').reduce((acc, i) => {
				acc[i] = true;
				return acc;
			}, {});
			document.querySelectorAll('details').forEach(elDetails => {
				if (elDetails.open !== state[elDetails]) elDetails.open = state[elDetails.id];
			});
			openingA = false;
		}
		window.addEventListener('hashchange', openHintsFromHash);
		openHintsFromHash();

		document.querySelectorAll('details').forEach(elDetails => {
			elDetails.addEventListener('toggle', (event) => {
				if (openingA) return;
				openingB = true;
				const hashOld = location.hash;
				const hashNewArr = hashOld.split('|').filter(i => i && i !== '#' && i !== event.currentTarget.id);
				if (event.currentTarget.open) {
					hashNewArr.push(event.currentTarget.id);
				}
				hashNewArr.unshift('#');
				const hashNew = hashNewArr.sort().join('|');
				if (hashOld !== hashNew) location.hash = hashNew;
				openingB = false;
				event.stopPropagation();
			});
		});
	</script>
</body>

</html>
`.trim();
}
