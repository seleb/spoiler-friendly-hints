# spoiler-friendly-hints

Converts plaintext into a simple html format with nested collapsible sections.

Includes a handful of presentational options and hash-based navigation history.

## Use

```js
import { convert } from 'spoiler-friendly-hints';

const plaintextInput = `...`;
const htmlOutput = convert(plaintextInput, {
  // default values for options
  preamble: true,
  title: '',
  preambleUrl: '',
  colorText: '#FFF',
  colorBg: '#000',
  colorAccent: '#FFC',
  indent: /(^\t*)(.*$)/,
  highlight: /!!!/,
});
```

### Input format

Each line may include nested children, indicated by their indent level (by default tabs are used, but this can be configured to use something else, e.g. `indent: /(^(?:\s{2})*)(.*$)/` will use 2 spaces). Lines which have no nested children will be presented as plaintext. Extra blank lines are ignored and can be used to space out entries.

How you format the text is entirely up to you. You might use a question and answer format, simple statements, or even raw HTML.

#### Sample input

```txt
Did you check under the sofa?
	It's not there.
Did you check by the entrance?
	It's not there.
Did you check inside the bathroom?
	Did you shut the door after you?
		!!! Did you check every surface?
			It's in the bathroom, behind the door, on the back wall.
```

#### Sample output

<details id="h2a">
  <summary>hints</summary>
  <ul>
    <li>
      <details id="h85">
        <summary>Did you check under the sofa?</summary>
        <ul>
          <li>
            It's not there.
          </li>
        </ul>
      </details>
    </li>
    <li>
      <details id="h8e">
        <summary>Did you check by the entrance?</summary>
        <ul>
          <li>
            It's not there.
          </li>
        </ul>
      </details>
    </li>
    <li>
      <details id="h3b">
        <summary>Did you check inside the bathroom?</summary>
        <ul>
          <li>
            <details id="h88">
              <summary>Did you shut the door after you?</summary>
              <ul>
                <li>
                  <details id="hff">
                    <summary>!!! Did you check every surface?<span class="highlight"></span></summary>
                    <ul>
                      <li>
                        It's in the bathroom, behind the door, on the back wall.
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </li>
  </ul>
</details>

More examples are available in the test files (e.g. [`./src/index.test - default values.snapshot.html`](./src/index.test%20-%20default%20values.snapshot.html)).
