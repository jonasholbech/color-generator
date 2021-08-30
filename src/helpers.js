export function copyToClipboard() {
  const copyText = document.querySelector("textarea");
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
}
export function getLightnessSteps() {
  let steps = 9;
  let min = 16;
  let max = 96;
  let range = max - min;
  let ret = [];
  for (let i = min; i < max; i += range / steps) {
    ret.push(i);
  }
  return ret;
}
export function getOutput($colors) {
  let ret = "";
  $colors.forEach((col) => {
    getLightnessSteps().forEach((step, index) => {
      ret += `--color-${col.name}-${index * 100}: hsl(${col.h},${
        col.s
      }%,${Math.round(step)}%);\n`;
    });
  });
  return ret;
}
