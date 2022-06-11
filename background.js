/* INITIALIZATION */
let WINDOW_SIZE = {
  width: 0,
  height: 0,
};

let mapped = new Map();

async function initializeExtension() {
  const DISPLAY_PROMISE = await chrome.system.display.getInfo();
  const DISPLAY_BOUNDS = DISPLAY_PROMISE[0]["bounds"];
  WINDOW_SIZE.width = DISPLAY_BOUNDS["width"];
  WINDOW_SIZE.height = DISPLAY_BOUNDS["height"];

  let window_id = await getLastWindowId();
  mapped.set(window_id, null);
}

async function getLastWindowId() {
  let OMEGA = await chrome.windows.getLastFocused();
  return OMEGA["id"];
}

initializeExtension();

async function createWindow(num_mapped) {
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

/* USER COMMAND LISTENER */
chrome.commands.onCommand.addListener((command) => {
  console.log(mapped);
  console.log(mapped.size);
  num_mapped = mapped.size;

  switch (command) {
    case "increase-window":
      console.log("increase-window");
      if (num_mapped < 4) createWindow(num_mapped);
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

/* WINDOW ON/OFF LISTERNER */
async function removeFromMap(windowId) {
  console.log(windowId);
  mapped.delete(windowId);
  console.log(mapped.size);
}

async function addMap(window) {
  mapped.set(window.id, null);
}

chrome.windows.onRemoved.addListener(removeFromMap);
chrome.windows.onCreated.addListener(addMap);
