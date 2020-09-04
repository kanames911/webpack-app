import "reset-css";
import { TopFunc } from "./module/top";
import { AboutFunc } from "./module/about";

document.addEventListener("DOMContentLoaded", () => {
  switch (true) {
    case document.body.classList.contains("top"):
      TopFunc();
      break;
    case document.body.classList.contains("about"):
      AboutFunc();
      break;
    default:
      break;
  }
});
