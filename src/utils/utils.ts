export function getRandomTailWindBgColors(amount: number) {
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
  //Select random colors from the array accprding to the amount
  const mixedColors = colors.sort(() => Math.random() - 0.5);
  return mixedColors.slice(0, amount);
}
