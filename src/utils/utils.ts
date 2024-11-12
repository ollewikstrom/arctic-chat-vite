const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-gray-500",
  "bg-red-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-gray-400",
  "bg-red-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-yellow-300",
  "bg-purple-300",
  "bg-pink-300",
  "bg-indigo-300",
  "bg-gray-300",
  "bg-fuchsia-300",
  "bg-rose-300",
  "bg-cyan-300",
  "bg-amber-300",
  "bg-lime-300",
  "bg-emerald-300",
];

export function getRandomTailWindBgColors(amount: number) {
  //Select random colors from the array accprding to the amount
  const mixedColors = colors.sort(() => Math.random() - 0.5);
  return mixedColors.slice(0, amount);
}

export function getRandomTailWindBgColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function makeRoomCode(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const synthwaveColors = [
  "#ff5e99", // Neon Pink
  "#ff76d7", // Bright Magenta
  "#9e51ff", // Purple
  "#5c4bfe", // Deep Violet
  "#4832e4", // Electric Blue
  "#2d1b8f", // Dark Purple
  "#18ffff", // Cyan
  "#00e5ff", // Light Neon Blue
  "#e0ff26", // Neon Yellow
  "#ff9100", // Neon Orange
  "#ff1744", // Bright Red
  "#282a36", // Dark Background (Base Color)
  "#1a1a2e", // Midnight Background
  "#000000", // Pure Black
];
