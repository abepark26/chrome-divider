/* INITIALIZATION */
let WINDOW_SIZE = {
  width: 0,
  height: 0,
};

let mapped = new Map();
let num_mapped = 0;
let curr_id = 0;

async function initializeExtension() {
  const DISPLAY_PROMISE = await chrome.system.display.getInfo();
  const DISPLAY_BOUNDS = DISPLAY_PROMISE[0]["bounds"];
  WINDOW_SIZE.width = DISPLAY_BOUNDS["width"];
  WINDOW_SIZE.height = DISPLAY_BOUNDS["height"];

  addToMap();
}

async function addToMap() {
  let ALPHA = await chrome.windows.getLastFocused();
  curr_id = ALPHA["id"];
  num_mapped += 1;
  mapped.set(curr_id, null);
}

async function createWindow() {
  switch (num_mapped) {
    case 1:
      await chrome.windows.create({
        width: WINDOW_SIZE.width / 2,
        height: WINDOW_SIZE.height,
      });
      break;
    case 2:
      await chrome.windows.create({
        width: WINDOW_SIZE.width / 3,
        height: WINDOW_SIZE.height,
      });
      break;
    case 3:
      await chrome.windows.create({
        width: WINDOW_SIZE.width / 2,
        height: WINDOW_SIZE.height / 2,
      });
      break;
    default:
      await chrome.windows.create({
        width: WINDOW_SIZE.width,
        height: WINDOW_SIZE.height,
      });
      break;
  }
}

/* EXECUTION */
initializeExtension();
chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "increase-window":
      console.log("increase-window");
      if (num_mapped < 4) {
        createWindow();
        addToMap();
      }
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
      console.warn("Unrecognized command");
  }
});
