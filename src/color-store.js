import { writable } from "svelte/store";

export const colors = writable(
  JSON.parse(localStorage.getItem("colors")) || []
);
