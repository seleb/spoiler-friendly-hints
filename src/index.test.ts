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
hints
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
hints
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
hints
  foo
    bar
    baz
      !!! alice
        bob
second top-level hints
  bob
    alice
    baz
      !!! bar
        foo
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
	test('readme example', async (context) => {
		const input = `
hints
	Did you check under the sofa?
		It's not there.
	Did you check by the entrance?
		It's not there.
	Did you check inside the bathroom?
		Did you shut the door after you?
			!!! Did you check every surface?
				It's in the bathroom, behind the door, on the back wall.
`;
		await expect(convert(input)).toMatchFileSnapshot(__filename.replace(/.ts$/, ` - ${context.task.name}.snapshot.html`));
	});
});
