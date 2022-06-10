/* INITIALIZATION */
let WINDOW_SIZE = {
  width: 0,
  height: 0,
};

let STACK = [];
let STACK_LEN = 0;
let curr_id = 0;

async function initializeExtension() {
  const DISPLAY_PROMISE = await chrome.system.display.getInfo();
  const DISPLAY_BOUNDS = DISPLAY_PROMISE[0]["bounds"];
  WINDOW_SIZE.width = DISPLAY_BOUNDS["width"];
  WINDOW_SIZE.height = DISPLAY_BOUNDS["height"];

  let ALPHA = await chrome.windows.getCurrent();
  curr_id = ALPHA["id"];
  STACK.push(curr_id);
}

/* EXECUTION */
initializeExtension();
chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "increase-window":
      console.log("increase-window");
      chrome.windows.create({
        width: WINDOW_SIZE.width / 2,
        height: WINDOW_SIZE.height / 2,
      });
      break;
    case "decrease-window":
      console.log("decrease-window");
      break;
    case "rotate-window-right":
      console.log("rotate-window-right");
      break;
    case "rotate-window-left":
      console.log("rotate-window-left");
      break;
    default:
      console.warn("Unrecognized command: ");
  }
});
