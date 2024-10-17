export const getRandomColor = () => {
  const letters = "234"; // Limitar para valores mais escuros
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};
