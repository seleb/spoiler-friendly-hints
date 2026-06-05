import { describe, expect, test, vi } from 'vitest';
import { convert } from ".";

vi.mock(import('../package.json'), (original) => ({
	...original,
	default: {
		...original.default,
		name: 'vitest',
		version: 'TEST',
	},
}));

describe('convert', () => {
	test('default values', async (context) => {
		const input = `
foo
	bar
	baz
		!!! alice
			bob
`;
		await expect(convert(input)).toMatchFileSnapshot(__filename.replace(/.ts$/, ` - ${context.task.name}.snapshot.html`));
	});
	test('without preamble', async (context) => {
		const input = `
foo
	bar
	baz
		!!! alice
			bob
`;
		await expect(convert(input, {
			preamble: false,
		})).toMatchFileSnapshot(__filename.replace(/.ts$/, ` - ${context.task.name}.snapshot.html`));
	});
	test('with all options', async (context) => {
		const input = `
foo
  bar
  baz
    !!! alice
      bob
`;
		await expect(convert(input, {
			preamble: true,
			title: 'My Title',
			preambleUrl: 'https://test.com',
			colorText: '#F00',
			colorBg: '#0F0',
			colorAccent: '#00F',
			indent: /(^(?:\s{2})*)(.*$)/,
			highlight: /baz/,
		})).toMatchFileSnapshot(__filename.replace(/.ts$/, ` - ${context.task.name}.snapshot.html`));
	});
});
