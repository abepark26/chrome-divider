/*  */
let WINDOW_SIZE = {
  width: 0,
  height: 0,
};

async function getDisplayInfo() {
  let info = await chrome.system.display.getInfo();
  return info;
}

getDisplayInfo().then((response) => {
  let bounds = response[0]["bounds"];
  WINDOW_SIZE.width = bounds["width"];
  WINDOW_SIZE.height = bounds["height"];
});

/* STACK */
let stack = [];

/* COMMANDS */
chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "increase-window":
      console.log("increase-window");
      chrome.windows.create({
        width: WINDOW_SIZE.width,
        height: WINDOW_SIZE.height,
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
