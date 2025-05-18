const hypo = (x, y, threshold) => {
  const newX = x + threshold;
  const newY = y + threshold;
  const points = [[newX, y].join(" "), [newX, newY].join(" ")].join(",");

  return { points, newX, newY };
};

const sideOnBase = (x, y, threshold) => {
  const newX = x + threshold;
  const newY = y + threshold;
  const points = [[x, newY].join(" "), [newX, newY].join(" ")].join(",");

  return { points, newX, newY };
};

const generatePoints = (
  x,
  y,
  n,
  threshold,
  pointsGenerator = hypo,
  points = `${x} ${y}`
) => {
  if (n <= 0) {
    return points;
  }

  const { points: newPoints, newX, newY } = pointsGenerator(x, y, threshold);

  return generatePoints(
    newX,
    newY,
    n - 1,
    threshold,
    pointsGenerator,
    points.concat(",", newPoints)
  );
};

const main = () => {};

document.addEventListener("DOMContentLoaded", main);
