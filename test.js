let full = [2080, 1440, 960, 480, 160];
let part = [1392, 1044, 696, 348, 116];

function data(dataSet) {
  let hourlyRate = 20;
  let oneYear = Math.floor(hourlyRate * dataSet[0]);
  let nineMonth = Math.floor(hourlyRate * dataSet[1]);
  let sixMonth = Math.floor(hourlyRate * dataSet[2]);
  let threeMonth = Math.floor(hourlyRate * dataSet[3]);
  let oneMonth = Math.floor(hourlyRate * dataSet[4]);

  console.log(oneYear, nineMonth, sixMonth, threeMonth, oneMonth);
}

data(full);
