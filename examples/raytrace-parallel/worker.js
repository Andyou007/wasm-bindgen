// import our shim JS scripts
import init, { child_entry_point } from './raytrace_parallel.js';

// Wait for the main thread to send us the shared module/memory. Once we've got
// it, initialize it all.
//
// After our first message all subsequent messages are an entry point to run,
// so we just do that.
self.onmessage = event => {
  const [module_or_path, memory] = event.data;
  let initialised = init({ module_or_path, memory }).catch(err => {
    // Propagate to main `onerror`:
    setTimeout(() => {
      throw err;
    });
    // Rethrow to keep promise rejected and prevent execution of further commands:
    throw err;
  });

  self.onmessage = async event => {
    // This will queue further commands up until the module is fully initialised:
    await initialised;
    child_entry_point(event.data);
  };
};
