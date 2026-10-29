/**
 * @file scripts/components/icons.js
 * Original TradeIt SVG icon set. Every icon is decorative; its button or link supplies the accessible name.
 */
"use strict";

const iconPaths = {
  arrow: "M4 12h16m-6-6 6 6-6 6",
  back: "M20 12H4m6-6-6 6 6 6",
  chevron: "m9 5 7 7-7 7",
  down: "m6 9 6 6 6-6",
  search: "M21 21l-5-5m2-6a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  close: "m6 6 12 12M6 18 18 6",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  heart:
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  chat: "M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-1l-6 2 2-6a9 9 0 1 1 17-4Z M8 11h.01M12 11h.01M16 11h.01",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  calendar:
    "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM7 14h3m4 0h3m-10 4h3",
  shield: "m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm-4 10 3 3 5-6",
  check: "m5 12 4 4L19 6",
  leaf: "M20 3c-8-2-16 2-16 9a7 7 0 0 0 7 7c7 0 9-8 9-16ZM3 22 16 9",
  repeat: "M3 7h17l-4-4M21 17H4l4 4",
  camera:
    "M4 6h4l2-3h4l2 3h4a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm13 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z",
  tool: "M14 6a6 6 0 0 1 7-3l-4 4v3h3l4-4a6 6 0 0 1-8 7L6 23l-5-5L11 8a6 6 0 0 1 3-2Z",
  tent: "m2 21 10-18 10 18H2Zm6 0 4-8 4 8M9 2l3 4 3-4",
  bike: "M8 16a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm17 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0ZM3 16l5-9 7 9H3l8-12m-5 0h6m5 0h3l2 8",
  home: "m3 10 9-8 9 8v11H3V10Zm6 11v-8h6v8",
  music:
    "M9 18V5l12-3v13M9 8l12-3M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  calculator:
    "M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1ZM7 5h10v4H7V5ZM8 13h1m6 0h1m-8 4h1m6 0h1",
  grid: "M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z",
  list: "M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01",
  map: "m2 5 7-3 6 3 7-3v17l-7 3-6-3-7 3V5Zm7-3v17m6-14v17",
  filter: "M4 6h16M7 12h10M10 18h4",
  user: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 22v-2a8 8 0 0 1 16 0v2",
  users:
    "M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM3 21v-2a8 8 0 0 1 16 0v2M18 3a4 4 0 0 1 0 8m3 10v-2a8 8 0 0 0-3-6",
  box: "m12 2 10 5-10 5L2 7l10-5ZM2 7v10l10 5 10-5V7M12 12v10M7 4.5l10 5",
  wallet: "M20 7V4H4a2 2 0 0 0 0 4h17v13H4a2 2 0 0 1-2-2V6m19 6h-6v5h6m-3-2.5h.01",
  settings:
    "m9 3 1-2h4l1 2 3 2 3 1 2 4-2 2v3l-1 3-4 1-2 3h-4l-2-3-4-1-1-3v-3l-2-2 2-4 3-1 3-2Zm7 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  help: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM9 8a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 4h.01",
  logout: "M9 3H3v18h6m5-14 5 5-5 5M8 12h11",
  clock: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2",
  star: "m12 2 3 6.4 7 .9-5.1 5 .9 7-5.8-3.3-5.8 3.3.9-7L2 9.3l7-.9L12 2Z",
  upload: "M12 16V2m-5 5 5-5 5 5M3 14v7h18v-7",
  file: "M14 2H4v20h16V8l-6-6Zm0 0v6h6M8 13h8m-8 4h8",
  send: "m22 2-7 20-4-9-9-4 20-7Zm0 0L11 13",
  link: "M10 13a5 5 0 0 0 7 0l4-4a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-4 4a5 5 0 0 0 7 7l2-2",
  lock: "M6 10V7a6 6 0 0 1 12 0v3M4 10h16v12H4V10Zm8 5v3",
  download: "M12 2v14m-5-5 5 5 5-5M3 17v5h18v-5",
  eye: "M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12Zm14 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  edit: "m16 3 5 5M3 21l5-1L22 6l-4-4L4 16l-1 5Z",
  more: "M4 12h.01M12 12h.01M20 12h.01",
  flag: "M4 22V3m0 0c5-4 11 4 16 0v11c-5 4-11-4-16 0",
  credit: "M3 4h18v16H3V4ZM3 9h18M7 15h4",
  chart: "M3 3v18h19M7 16l4-5 4 2 6-7",
  mail: "M2 4h20v16H2V4Zm0 0 10 9L22 4",
  external: "M14 2h8v8m0-8L10 14M10 3H3v18h18v-7",
  info: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 11v6m0-10h.01",
  menu: "M3 6h18M3 12h18M3 18h18",
  building: "M4 22V5l8-3 8 3v17M9 22v-5h6v5M8 8h1m6 0h1m-8 4h1m6 0h1",
  image: "M3 3h18v18H3V3ZM3 17l6-7 6 6 3-3 3 4M17 7h.01",
};

const renderIcon = (name, cls = "") =>
  /* HTML */ `<svg
    class="icon ${cls}"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="${iconPaths[name] || iconPaths.box}" />
  </svg>`;
