# Wasm in Web Worker

[View full source code][code]

[code]: https://github.com/wasm-bindgen/wasm-bindgen/tree/master/examples/wasm-in-web-worker

A simple example of parallel execution by spawning a web worker with `web_sys`,
loading Wasm code in the web worker and interacting between the main thread and
the worker.

## Building & compatibility

The example is built with `--target web`, so the generated JS is an ES module.
The worker is created as a module worker (`WorkerType::Module`) so that it can
`import` the generated JS as well. The full command can be found in
`package.json`.

## `Cargo.toml`

The `Cargo.toml` enables features necessary to work with the DOM, log output to
the JS console, creating a worker and reacting to message events.

```toml
{{#include ../../../examples/wasm-in-web-worker/Cargo.toml}}
```

## `src/lib.rs`

Creates a struct `NumberEval` with methods to act as stateful object in the
worker and function `startup` to be launched in the main thread. Also includes
internal helper functions `setup_input_oninput_callback` to attach a
`wasm_bindgen::Closure` as callback to the `oninput` event of the input field
and `get_on_msg_callback` to create a `wasm_bindgen::Closure` which is triggered
when the worker returns a message.

```rust
{{#include ../../../examples/wasm-in-web-worker/src/lib.rs}}
```

## `index.html`

Includes the input element `#inputNumber` to type a number into and a HTML
element `#resultField` were the result of the evaluation even/odd is written to.
`index.js` is loaded as an ES module.

```html
{{#include ../../../examples/wasm-in-web-worker/index.html}}
```

## `index.js`

Loads our Wasm file asynchronously and calls the entry point `startup` of the
main thread which will create a worker.

```js
{{#include ../../../examples/wasm-in-web-worker/index.js}}
```

## `worker.js`

Loads our Wasm file by importing the default initialization function from
`./wasm_in_web_worker.js` and then awaiting the Promise it returns. Creates a new object to do the background
calculation and bind a method of the object to the `onmessage` callback of the
worker.

```js
{{#include ../../../examples/wasm-in-web-worker/worker.js}}
```
