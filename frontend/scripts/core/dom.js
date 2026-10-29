/**
 * @file scripts/core/dom.js
 * Small DOM selection helpers shared by all page controllers.
 */
"use strict";

const selectElement = (s) => document.querySelector(s),
  selectElements = (s) => Array.from(document.querySelectorAll(s));
