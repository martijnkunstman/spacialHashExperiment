let sizeWH = 500;
let cellCount = 25;
let pointCount = 2000;
let points = [];
let cells = [];

let frameTimeElement = document.getElementById('frameTime');
let frameRateElement = document.getElementById('frameRate');
let nCountElement = document.getElementById('nCount');
let shCountElement = document.getElementById('shCount');
let timesFasterElement = document.getElementById('timesFaster'); 

//p5.disableFriendlyErrors = true; // disables FES

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
  nCountElement.innerHTML = "n squared operations:"+(pointCount * pointCount);
}
let currentTime = 0;
let oldTime = 0;
function draw() {
  currentTime = millis()-oldTime;
  oldTime = millis();
  frameTimeElement.innerHTML = "time:"+Math.round(currentTime);
  frameRateElement.innerHTML = "frameRate:"+Math.round(frameRate());
  for (let i = 0; i < points.length; i++) {
    points[i][2] = 0;
  }
  counter = 0;
  space();
  shCountElement.innerHTML = "spacial hash operations:"+counter;
  timesFasterElement.innerHTML = "times faster:" +Math.round((pointCount * pointCount)/counter);

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