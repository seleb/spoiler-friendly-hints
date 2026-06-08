(function(e,t){typeof exports==`object`&&typeof module<`u`?t(exports):typeof define==`function`&&define.amd?define([`exports`],t):(e=typeof globalThis<`u`?globalThis:e||self,t(e[`spoiler-friendly-hints`]={}))})(this,function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t={name:`spoiler-friendly-hints`,version:`1.0.4`,type:`module`,description:`Converts plaintext into a simple html format with nested collapsible sections`,author:`Sean S. LeBlanc <sean.s.leblanc@gmail.com>`,license:`MIT`,repository:{type:`git`,url:`git+ssh://git@github.com/seleb/spoiler-friendly-hints.git`},keywords:[`hints`,`txt`,`plaintext`,`html`,`spoilers`],types:`./dist/src/index.d.ts`,main:`./dist/spoiler-friendly-hints.umd.cjs`,module:`./dist/spoiler-friendly-hints.js`,exports:{".":{import:`./dist/spoiler-friendly-hints.js`,require:`./dist/spoiler-friendly-hints.umd.cjs`,types:`./dist/src/index.d.ts`}},files:[`dist/**`],scripts:{build:`vite build`,test:`vitest`,prepare:`npm run build`,preversion:`npm run build`},devDependencies:{"@types/node":`^25.9.2`,typescript:`^6.0.3`,"unplugin-dts":`^1.0.2`,vite:`^8.0.16`,vitest:`^4.1.8`}};function n(e){return`${e.split(``).reduce((e,t)=>e+(t.charCodeAt(0)||0),0).toString(36)}${e.length.toString(36)}`}function r(e,{preamble:r=!0,title:i=``,preambleUrl:a=``,colorText:o=`#FFF`,colorBg:s=`#000`,colorAccent:c=`#FFC`,indent:l=/(^\t*)(.*$)/,highlight:u=/!!!/}={}){let d=e.trim().split(/[\r\n]+/).filter(e=>e.trim()),f=[{summary:``,detail:[]}],p=[f[0]],m=e=>e[e.length-1];for(let e of d){let[,t,n]=e.split(l),r=t.length+1;for(r>p.length&&p.push(m(m(p).detail));r<p.length;)p.pop();m(p).detail.push({summary:n,detail:[]})}let h=new Set;function g(e){let t=0,r=``;for(;!r&&t<100;)r=`h${n(`${e}${t}`)}`,h.has(r)&&(r=``,++t);return h.add(r),r}let _=(e,t)=>{let n=`	`.repeat(t);return e.detail.length>0?`
${n}<details id="${g(`${e.summary}.${t}`)}">
${n}	<summary>${e.summary}${u?.exec(e.summary)?`<span class="highlight"></span>`:``}</summary>
${n}	<ul>${e.detail.map(e=>`
${n}		<li>${_(e,t+3)}
${n}		</li>`).join(``)}
${n}	</ul>
${n}</details>`:`
${n}${e.summary}`};return`
<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<title>${[i,`Hints`].filter(e=>e).join(` | `)}</title>
	<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
	<meta name="theme-color" content="${s}">
	<meta name="generator" content="${t.name} v${t.version}" />

	<style>
		html {
			--bg: ${s};
			--text: ${o};
			--accent: ${c};
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
	<h1>${[i,`Hints`].filter(e=>e).join(` | `)}</h1>

	${r?`<p>This is a list of hints${i?` for ${a?`<a href="${a}">${i}</a>`:i}`:``}. These hints start out vague and get more specific the deeper you expand in order to try to help you get unstuck while trying to avoid spoiling full solutions.</p>`:``}

	${f[0].detail.map(e=>_(e,1)).join(`
`)}

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
	<\/script>
</body>

</html>
`.trim()}e.convert=r});