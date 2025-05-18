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
  lineGenerator = hypo,
  points = `${x} ${y}`
) => {
  if (n <= 0) {
    return points;
  }

  const { points: newPoints, newX, newY } = lineGenerator(x, y, threshold);

  return generatePoints(
    newX,
    newY,
    n - 1,
    threshold,
    lineGenerator,
    points.concat(",", newPoints)
  );
};

const polyLine = (points, fill = "black") =>
  `<polyline points="${points}" fill="${fill}"></polyline>`;

const appendToRoot = (data) => {
  const root = document.querySelector(".board");

  root.innerHTML = data;
};

function* repeatedCycle(start, n, threshold, sign = 1) {
  let next = start;
  let count = 0;

  while (true) {
    if (count === n) {
      sign *= -1;
      count = 0;
    }
    yield next;
    next += threshold * sign;
    count += 1;
  }
}

const animate = () => {
  const cycle1 = repeatedCycle(50, 5, 10, -1);
  const cycle2 = repeatedCycle(0, 5, 10);

  setInterval(() => {
    const start1 = cycle1.next().value;
    const start2 = cycle2.next().value;

    const line1 = generatePoints(start1, start1, 10, 10, hypo);
    const line2 = generatePoints(start2, start2, 10, 10, sideOnBase);

    const svg = polyLine(line1, "red").concat(polyLine(line2, "green"));
    const svgCode = `<svg xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;

    appendToRoot(svgCode);
  }, 1000);
};

document.addEventListener("DOMContentLoaded", animate);
