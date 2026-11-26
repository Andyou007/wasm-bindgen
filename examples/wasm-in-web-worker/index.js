// We only need `startup` here which is the main entry point
// In theory, we could also use all other functions/struct types from Rust which we have bound with
// `#[wasm_bindgen]`
import init, { startup } from './wasm_in_web_worker.js';

async function run_wasm() {
    // Load the Wasm file by awaiting the Promise
    await init();

    console.log('index.js loaded');

    // Run main Wasm entry point
    // This will create a worker from within our Rust code compiled to Wasm
    startup();
}

run_wasm();
