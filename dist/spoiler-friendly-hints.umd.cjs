(function(e,t){typeof exports==`object`&&typeof module<`u`?t(exports):typeof define==`function`&&define.amd?define([`exports`],t):(e=typeof globalThis<`u`?globalThis:e||self,t(e[`spoiler-friendly-hints`]={}))})(this,function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,a=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,t,a,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=i(t),l=0,u=c.length,d;l<u;l++)d=c[l],!o.call(e,d)&&d!==a&&n(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=r(t,d))||s.enumerable});return e},l=((e,r,i)=>(i=e==null?{}:t(a(e)),c(r||!e||!e.__esModule?n(i,`default`,{value:e,enumerable:!0}):i,e)))(s(((e,t)=>{t.exports={}}))(),1),u={name:`spoiler-friendly-hints`,version:`1.0.1`,type:`module`,description:`Converts plaintext into a simple html format with nested collapsible sections`,author:`Sean S. LeBlanc <sean.s.leblanc@gmail.com>`,license:`MIT`,repository:{type:`git`,url:`git+ssh://git@github.com/seleb/spoiler-friendly-hints.git`},keywords:[`hints`,`txt`,`plaintext`,`html`,`spoilers`],types:`./dist/src/index.d.ts`,main:`./dist/spoiler-friendly-hints.umd.cjs`,module:`./dist/spoiler-friendly-hints.js`,exports:{".":{import:`./dist/spoiler-friendly-hints.js`,require:`./dist/spoiler-friendly-hints.umd.cjs`}},files:[`dist/**`],scripts:{build:`vite build`,test:`vitest`,prepare:`npm run build`,preversion:`npm run build`},devDependencies:{"@types/node":`^25.9.2`,typescript:`^6.0.3`,"unplugin-dts":`^1.0.2`,vite:`^8.0.16`,vitest:`^4.1.8`}};function d(e,t){return Math.log10(e)/Math.log10(t)}function f(e,{preamble:t=!0,title:n=``,preambleUrl:r=``,colorText:i=`#FFF`,colorBg:a=`#000`,colorAccent:o=`#FFC`,indent:s=/(^\t*)(.*$)/,highlight:c=/!!!/}={}){let f=e.trim().split(/[\r\n]+/).filter(e=>e.trim()),p=[{summary:`hints`,detail:[]}],m=[p[0]],h=e=>e[e.length-1];for(let e of f){let[,t,n]=e.split(s),r=t.length+1;for(r>m.length&&m.push(h(h(m).detail));r<m.length;)m.pop();h(m).detail.push({summary:n,detail:[]})}let g=new Set;function _(e){let t=0,n=``;for(;!n&&t<100;)n=`h${l.createHash(`shake256`,{outputLength:Math.ceil(d(f.length,8))}).update(`${e}${t}`).digest(`hex`)}`,g.has(n)&&(n=``,++t);return g.add(n),n}let v=(e,t)=>{let n=`	`.repeat(t);return e.detail.length>0?`
${n}<details id="${_(`${e.summary}.${t}`)}">
${n}	<summary>${e.summary}${c?.exec(e.summary)?`<span class="highlight"></span>`:``}</summary>
${n}	<ul>${e.detail.map(e=>`
${n}		<li>${v(e,t+3)}
${n}		</li>`).join(``)}
${n}	</ul>
${n}</details>`:`
${n}${e.summary}`};return`
<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<title>${[n,`Hints`].filter(e=>e).join(` | `)}</title>
	<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
	<meta name="theme-color" content="${a}">
	<meta name="generator" content="${u.name} v${u.version}" />

	<style>
		html {
			--bg: ${a};
			--text: ${i};
			--accent: ${o};
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
	<h1>${[n,`Hints`].filter(e=>e).join(` | `)}</h1>

	${t?`<p>This is a list of hints${n?` for ${r?`<a href="${r}">${n}</a>`:n}`:``}. These hints start out vague and get more specific the deeper you expand in order to try to help you get unstuck while trying to avoid spoiling full solutions.</p>`:``}

	${v(p[0],1)}

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
`.trim()}e.convert=f});