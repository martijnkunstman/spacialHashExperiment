let sizeWH = 500;
let cellCount = 10;
let pointCount = 1000;
let points = [];
let cells = [];

function setup() {
  //pixelDensity(1);
  createCanvas(sizeWH, sizeWH);
  for (let i = 0; i < pointCount; i++) {
    points.push([random(sizeWH), random(sizeWH), 0]);
  }
  for (let a = 0; a < cellCount; a++) {
    cells.push([]);
    for (let b = 0; b < cellCount; b++) {
      cells[a].push(0);
    }
  }

  for (let a = 0; a < cells.length; a++) {
    for (let b = 0; b < cells[a].length; b++) {
      cells[a][b] = 0;
    }
  }
  if (mouseX > 0 && mouseX < sizeWH) {
    if (mouseY > 0 && mouseY < sizeWH) {
      cells[Math.floor((mouseX / sizeWH) * cellCount)][
        Math.floor((mouseY / sizeWH) * cellCount)
      ] = 1;
    }
  }
  for (let a = 0; a < cells.length; a++) {
    for (let b = 0; b < cells[a].length; b++) {
      if (cells[a][b]) {
        fill("green");
      } else {
        fill("white");
      }
      square(
        (a * sizeWH) / cellCount,
        (b * sizeWH) / cellCount,
        sizeWH / cellCount
      );
    }
  }
}

function draw() {
  for (let i = 0; i < points.length; i++) {
    points[i][2] = 0;
  }
   counter = 0;
  space();
  fill("red");
  textSize(16);
  text(counter, 10, 10 + 16);

  for (let i = 0; i < points.length; i++) {
    if (
      points[i][0] < mouseX + sizeWH / cellCount*2 &&
      points[i][0] > mouseX - sizeWH / cellCount*2 &&
      points[i][1] < mouseY + sizeWH / cellCount*2 &&
      points[i][1] > mouseY - sizeWH / cellCount*2
    ) {
      if (points[i][2] != 2) {
        points[i][2] = 1;
      }
    }
    if (points[i][2]) {
      if (points[i][2] == 2) {
        fill("blue");
      } else {
        fill("red");
      }
    } else {
      fill("white");
    }
    square(points[i][0] - 1.5, points[i][1] - 1.5, 3);
  } 
  counter = pointCount * pointCount;
  fill("blue");
  textSize(16);
  text(counter, 10, sizeWH - 10);
}
let printme = true;
let counter = 0;

function space() {
  let pointsArray = [];
  for (let a = 0; a < cellCount; a++) {
    pointsArray.push([]);
    for (let b = 0; b < cellCount; b++) {
      pointsArray[a].push([]);
      counter++;
    }
  }
  for (let a = 0; a < points.length; a++) {
    pointsArray[Math.floor((points[a][1] / sizeWH) * cellCount)][
      Math.floor((points[a][0] / sizeWH) * cellCount)
    ].push(a); //
    counter++;
  }
  if (printme) {
    //console.log(pointsArray);
  }
  for (a = 0; a < pointsArray.length; a++) {
    for (b = 0; b < pointsArray[a].length; b++) {
      for (c = 0; c < pointsArray[a][b].length; c++) {
        let dezeId = pointsArray[a][b][c];
        //console.log(pointsArray[a][b]);
        let pointsAround = [];
        pointsAround = pointsAround.concat(pointsArray[a][b]);

        if (b > 0) {
          pointsAround = pointsAround.concat(pointsArray[a][b - 1]);
        }
        if (b < cellCount - 1) {
          pointsAround = pointsAround.concat(pointsArray[a][b + 1]);
        }

        if (a > 0) {
          if (b > 0) {
            pointsAround = pointsAround.concat(pointsArray[a - 1][b - 1]);
          }
          pointsAround = pointsAround.concat(pointsArray[a - 1][b]);
          if (b < cellCount - 1) {
            pointsAround = pointsAround.concat(pointsArray[a - 1][b + 1]);
          }
        }
        if (a < cellCount - 1) {
          if (b > 0) {
            pointsAround = pointsAround.concat(pointsArray[a + 1][b - 1]);
          }
          pointsAround = pointsAround.concat(pointsArray[a + 1][b]);
          if (b < cellCount - 1) {
            pointsAround = pointsAround.concat(pointsArray[a + 1][b + 1]);
          }
        }
        //vind point rondom deze behalve zichzelf
        for (d = 0; d < pointsAround.length; d++) {
          if (a == Math.floor((mouseY / sizeWH) * cellCount)) {
            if (b == Math.floor((mouseX / sizeWH) * cellCount)) {
              points[pointsAround[d]][2] = 2;
            }
          }
          counter++;
        }
      }
    }
  }
  //printme = false;
}