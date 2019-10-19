<<<<<<< HEAD
//1/8/2018  v0.06
//1/14/2018  v0.07 salary to Hour added
//1/29/2018  v0.08 Tweak decimal points position.
//3/3/2018  v0.09 Added compare. also added bugs.
//3/21/2018 Attempting to fix bugs, lol.
// April 1 - stuff worked on
// September 3 - visual redesign
// Added Apexchart 11/7/2018
// 11/8/2018 Apexchat improvements
// 11/12/2018 Fix some stuff, broke some stuff
// 11/14/2018 Fixed Graph issue, graph now updates correctly.
//11/16/2018 Apexchart fully intergared bug free
//11/19/2018 added different chart type
//10/14/2019 - bug fixes

// Reference locations
let wage = document.getElementById("hourWage");
let output = document.getElementById("output");
let output2 = document.getElementById("output2");
let warning = document.getElementById("warning");
let plug = document.getElementById("plug");
let ft = document.getElementById("fullTime");
let pt = document.getElementById("partTime");
let customButton = document.getElementById("custom");
let status = document.getElementById("status");
let customForm = document.getElementById("customForm");
let salaryToHour = document.getElementById("salaryHour");
let compare = document.getElementById("compare");
let check = document.getElementById("check");
let intWarning = document.getElementById("intWarning");
let updateChart = document.querySelector("#chart");
let salOut = document.querySelector("#salaryOutput");
let chartType = document.querySelector("#chartBtn");
chartType.value = "area";
let zero = 0;

//Hours worked
let fullTimeHoursWorked = [2080, 1440, 960, 480, 160, 0];
let partTimeHoursWorked = [1392, 1044, 696, 348, 116, 0];
let weeks = [52, 36, 26, 12, 4, 2, 1, 0];

//Graphic Reference locations
let graphWage = document.getElementById("hourWage");
let container = document.querySelector(".container");
let rate = graphWage.value;
let weekRate = rate * customForm.value;

//Compare Chart reference values
let hour1 = hourWage.value;
let hour2 = customForm.value;

wage.addEventListener("keyup", checkForm);

function checkForm() {
  if (wage.value.length > 0) {
    check.removeAttribute("disabled");
  } else {
    check.setAttribute("disabled", "");
  }
}

//Input field has focus
wage.focus();

//checks class of status
let statusClass = () => {
  console.log(status.classList.value);
  status.textContent = status.classList.value;
}

// Event listner for buttons.
// Main event listners in check status
check.addEventListener("click", checkStatus);
check.addEventListener("click", statusClass);

//Buttons
ft.addEventListener("click", addFT);
pt.addEventListener("click", addPT);
customButton.addEventListener("click", addCustom);
plug.addEventListener("click", behance);
salaryToHour.addEventListener("click", addToHourly);
compare.addEventListener("click", addCompare);

// Checks class to see which function needs to run.
function checkStatus() {
  //CUSTOM
  if (status.classList.value == "custom") {
    if (isNaN(wage.value) || wage.value == "") {
      warning.style.display = "none";
      intWarn();
    } else {
      customHours();
      getChart(chartType.value);
    }
    //FULL TIME
  } else if (status.classList.value == "full") {
    if (isNaN(wage.value) || wage.value == "") {
      warning.style.display = "none";
      //out Int Warning
      intWarn();
    } else {
      ftSalary();
      getChart(chartType.value);
    }
    // PART TIME
  } else if (status.classList.value == "part") {
    if (isNaN(wage.value) || wage.value == "") {
      warning.style.display = "none";
      intWarn();
    } else {
      ptSalary();
      getChart(chartType.value);
    }
    //ANNUAL
  } else if (status.classList.value == "annual") {
    if (isNaN(wage.value) || wage.value == "") {
      warning.style.display = "none";
      intWarn();
    } else {
      findHourly();
    }
    //COMPARE
  } else if (status.classList.value == "compare") {
    if (isNaN(wage.value) || wage.value == "") {
      warning.style.display = "none";
      intWarn();
    } else {
      compareGraph(fullTimeHoursWorked, chartType.value);
      compareSalaries(hour1, hour2);
    }
  }
}

//Create Graph for Single Salaries
function getChart(type) {
  //Clear old chart
  chart.style.visibility = "inherit";
  chart.innerHTML = "";
  //Update values when function runs
  weekRate = rate * customForm.value;

  // Check to see which dataset to use for graph
  if (status.classList.value == "custom") {
    graphData(weekRate, weeks);
  } else if (status.classList.value == "full") {
    graphData(rate, fullTimeHoursWorked);
  } else if (status.classList.value == "part") {
    graphData(rate, partTimeHoursWorked);
  } else if (status.classList.value == "annual") {
  }

  // Create graph
  function graphData(rate, dataSet) {
    let oneYear = Math.floor(rate * dataSet[0]);
    let nineMonth = Math.floor(rate * dataSet[1]);
    let sixMonth = Math.floor(rate * dataSet[2]);
    let threeMonth = Math.floor(rate * dataSet[3]);
    let oneMonth = Math.floor(rate * dataSet[4]);

    if (rate) {
      let options = {
        chart: {
          // height: 400,
          type: `${type}`
        },
        series: [
          {
            name: "Salary",
            data: [zero, oneMonth, threeMonth, sixMonth, nineMonth, oneYear] /*data values*/
          }
        ],
        xaxis: {
          categories: ["0", "1", "3", "6", "9", "12"],
          title: {
            text: "Months",
            style: {
              fontSize: "20px"
            }
          }
        },
        yaxis: {
          title: {
            text: "Salary",
            style: {
              fontSize: "20px"
            }
          }
        }
      };

      let chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }
  }
  chartType.style.display = "inherit";
}

function compareGraph(time, type) {
  chartType.style.display = "inherit";
  chart.style.visibility = "inherit";
  let newData1 = new Array();
  let newData2 = new Array();
  let hour1 = hourWage.value;
  let hour2 = customForm.value;

  //Calculating and values pushing to empty array(s)
  time.forEach(hour => {
    let sal1 = hour1 * hour;
    let sal2 = hour2 * hour;
    newData1.push(sal1);
    newData2.push(sal2);
  });

  let options = {
    chart: {
      type: `${type}`
    },
    series: [
      {
        name: "Salary 1",
        data: [zero, newData1[4], newData1[3], newData1[2], newData1[1], newData1[0]]
      },
      {
        name: "Salary 2",
        data: [zero, newData2[4], newData2[3], newData2[2], newData2[1], newData2[0]]
      }
    ],
    xaxis: {
      categories: [0, 1, 3, 6, 9, 12]
    }
  };

  if (updateChart.classList.value === "create") {
    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    updateChart.classList.replace("create", "update");
    salWarn();
  } else if (updateChart.classList.value = "update") {
    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    chart.updateSeries([
      {
        name: "Salary 1",
        data: [zero, newData1[4], newData1[3], newData1[2], newData1[1], newData1[0]]
      },
      {
        name: "Salary 2",
        data: [zero, newData2[4], newData2[3], newData2[2], newData2[1], newData2[0]]
      }
    ]);
  }
  salWarn();
}

function calResults(
  oneYear,
  nineMonth,
  sixMonth,
  threeMonth,
  oneMonth,
  weeklyCheck,
  overTime,
  biWeekly
) {
  output.innerHTML = `<div id ="outContainer">
                            <h4> Hourly Rate: ${wage.value}</h4>
                            <hr>
                            <p>
                            <strong class="title">Annual Salary:</strong><span class="dollar">$</span>${oneYear.toLocaleString()}<br>
                            <strong class="title">9 Month Salary:</strong><span class="dollar">$</span>${nineMonth.toLocaleString()}<br>
                            <strong class="title">6 Month Salary:</strong><span class="dollar">$</span>${sixMonth.toLocaleString()}<br>
                            <strong class="title">3 Month Salary:</strong><span class="dollar">$</span>${threeMonth.toLocaleString()}<br>
                            <strong class="title">1 Month Salary:</strong><span class="dollar">$</span>${oneMonth.toLocaleString()}<br>
                            <strong class="title">Bi-Weekly Check:</strong><span class="dollar">$</span>${biWeekly.toLocaleString()}<br>
                            <strong class="title">Weekly Check:</strong><span class="dollar">$</span>${weeklyCheck.toLocaleString()}<br>
                            <strong class="title">Overtime Rate:</strong><span class="dollar">$</span>${overTime.toLocaleString()}<br>
                            </p>
                        </div>`;
}

function ftSalary() {
  let oneYear = Math.floor(wage.value * fullTimeHoursWorked[0]);
  let nineMonth = Math.floor(wage.value * fullTimeHoursWorked[1]);
  let sixMonth = Math.floor(wage.value * fullTimeHoursWorked[2]);
  let threeMonth = Math.floor(wage.value * fullTimeHoursWorked[3]);
  let oneMonth = Math.floor(wage.value * fullTimeHoursWorked[4]);
  let weeklyCheck = Math.floor(wage.value * 40);
  let overTime = wage.value * 1.5;
  let biWeekly = Math.floor(wage.value * 80);

  // Calculate results and output data
  calResults(
    oneYear,
    nineMonth,
    sixMonth,
    threeMonth,
    oneMonth,
    weeklyCheck,
    overTime,
    biWeekly
  );

  output.style.display = "inherit"; //Output DIV
  warning.style.display = "inherit"; // Disclaimer
  ft.style.visibility = "visible"; // Button displays
  pt.style.visibility = "visible";
  warning.textContent = "*Results based on 40 hour work week. Gross income, taxes not included.";

  status.classList.remove("custom", "part");
  customForm.style.display = "none";
  status.classList.add("full");
  status.innerHTML = "<strong>Full-Time Hours</strong>";
}

function ptSalary() {
  let oneYear = Math.floor(wage.value * partTimeHoursWorked[0]);
  let nineMonth = Math.floor(wage.value * partTimeHoursWorked[1]);
  let sixMonth = Math.floor(wage.value * partTimeHoursWorked[2]);
  let threeMonth = Math.floor(wage.value * partTimeHoursWorked[3]);
  let oneMonth = Math.floor(wage.value * partTimeHoursWorked[4]);
  let biWeekly = Math.floor(wage.value * 58);
  let weeklyCheck = Math.floor(wage.value * 29); //40
  let overTime = wage.value * 1.5;

  calResults(
    oneYear,
    nineMonth,
    sixMonth,
    threeMonth,
    oneMonth,
    weeklyCheck,
    overTime,
    biWeekly
  );

  warning.style.display = "inherit";
  output.style.display = "inherit";
  ft.style.visibility = "visible";
  pt.style.visibility = "visible";
  warning.textContent = "*Results based on 29 hour work week. Gross income, taxes not included.";

  status.classList.remove("full");
  status.classList.add("part");
  status.innerHTML = "<strong>Part-Time Hours</strong>";
}

// Calculate custom hours worked.
function customHours() {
  let pay = wage.value;
  let hours = customForm.value;
  //check to ensure values input are numbers.
  if (isNaN(pay) || isNaN(hours)) {
    output.style.display = "inherit";
    output.innerHTML = `<div id ="outContainer">
                            <p>
                            <p><strong>Please insert a Numerical Value.</strong></p>
                            </p>
                            </div>`;
  } else if (pay > 0) {
    output.style.display = "inherit";
    // Salary per week
    let salary = pay * hours;
    output.innerHTML = `<div id ="outContainer">
                            <h4> Hourly Rate: ${pay}</h4>
                            <hr>
                            <p>
                            <strong class="title">Annual Salary:</strong><span class="dollar">$</span>${(
        salary * weeks[0]
      ).toLocaleString()}<br>
                            <strong class="title">9 Month Salary:</strong><span class="dollar">$</span>${(
        salary * weeks[1]
      ).toLocaleString()}<br>
                            <strong class="title">6 Month Salary:</strong><span class="dollar">$</span>${(
        salary * weeks[2]
      ).toLocaleString()}<br>
                            <strong class="title">3 Month Salary:</strong><span class="dollar">$</span>${(
        salary * weeks[3]
      ).toLocaleString()}<br>
                            <strong class="title">1 Month Salary:</strong><span class="dollar">$</span>${(
        salary * weeks[4]
      ).toLocaleString()}<br>
                            <strong class="title">Bi-Weekly Check:</strong><span class="dollar">$</span>${(
        salary * weeks[5]
      ).toLocaleString()}<br>
                            <strong class="title">Weekly Check:</strong><span class="dollar">$</span>${(
        salary * weeks[6]
      ).toLocaleString()}<br>
                            <strong class="title">Overtime Rate:</strong><span class="dollar">$</span>${(
        pay * 1.5
      ).toLocaleString()}<br>
                            </p>
                        </div>`;
  }
  warning.style.display = "inherit";
  warning.textContent = "*Results based on custom hour work week. Gross income, taxes not included.";
}

function findHourly() {
  let fts = (wage.value / 2080).toFixed(2);
  let pts = (wage.value / 1392).toFixed(2);

  if (fts <= 0 || pts <= 0) {
    output.style.display = "none";
  } else if (isNaN(fts) || isNaN(pts)) {
    warning.style.display = "none";
    output.style.display = "inherit";
    output.innerHTML = `<div id ="outContainer">
                            <p>
                            <p><strong>Please insert a Numerical Value.</strong></p>
                            </p>
                            </div>`;
  } else {
    salOut.style.display = "inherit";
    salOut.innerHTML = `<div id ="outContainer">
                            <p>
                            <strong class="title">Annual Full-time Hourly(40 hours):</strong><span class="dollar">$</span>${fts}<br>
                            <strong class="title">Annual Part-time Hourly(29 Hours)</strong><span class="dollar">$</span>${pts}<br>
                            </p>
                            </div>`;
  }
}

function compareSalaries() {
  let hour1 = hourWage.value;
  let hour2 = customForm.value;

  let oneYear = Math.floor(hour1 * fullTimeHoursWorked[0]);
  let nineMonth = Math.floor(hour1 * fullTimeHoursWorked[1]);
  let sixMonth = Math.floor(hour1 * fullTimeHoursWorked[2]);
  let threeMonth = Math.floor(hour1 * fullTimeHoursWorked[3]);
  let oneMonth = Math.floor(hour1 * fullTimeHoursWorked[4]);
  let weeklyCheck = Math.floor(hour1 * 40);
  let overTime = hour1 * 1.5;
  let biWeekly = Math.floor(hour1 * 80);

  let oneYear2 = Math.floor(hour2 * fullTimeHoursWorked[0]);
  let nineMonth2 = Math.floor(hour2 * fullTimeHoursWorked[1]);
  let sixMonth2 = Math.floor(hour2 * fullTimeHoursWorked[2]);
  let threeMonth2 = Math.floor(hour2 * fullTimeHoursWorked[3]);
  let oneMonth2 = Math.floor(hour2 * fullTimeHoursWorked[4]);
  let weeklyCheck2 = Math.floor(hour2 * 40);
  let overTime2 = hour2 * 1.5;
  let biWeekly2 = Math.floor(hour2 * 80);

  output.style.display = "inherit";
  output.innerHTML = `<div id ="outContainer">
                        <h4 class="compare-title">
                        <strong>Rate 1:</strong><span class="dollar">$</span><span class="rateColor1">${hour1}</span></strong><br>
                        <strong>Rate 2:</strong><span class="dollar">$</span><span class="rateColor2">${hour2}</span></strong>
                        </h4>

                        <hr>
                        
                        <strong class="title">Annual Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${oneYear.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${oneYear2.toLocaleString()}</span><br>

                        <strong class="title">9 Months Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${nineMonth2.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${nineMonth.toLocaleString()}</span><br>
                        
                        <strong class="title">6 Months Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${sixMonth.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${sixMonth2.toLocaleString()}</span><br>

                        <strong class="title">3 Months Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${threeMonth.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${threeMonth2.toLocaleString()}</span><br>

                        <strong class="title">1 Month Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${oneMonth.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${oneMonth2.toLocaleString()}</span><br>

                        <strong class="title">Biweekly Check:</strong><span class="dollar">$</span> <span class="rateColor1">${biWeekly.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${biWeekly2.toLocaleString()}</span><br>

                        <strong class="title">Weekly Check:</strong><span class="dollar">$</span> <span class="rateColor1">${weeklyCheck.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${weeklyCheck2.toLocaleString()}</span><br>

                        <strong class="title">Overtime Rate:</strong><span class="dollar">$</span> <span class="rateColor1">${overTime.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${overTime2.toLocaleString()}</span><br>
                       </div>`;
}

// Bring up form for custom hour input
function addCustom() {
  salOut.style.display = "none";
  customForm.style.display = "inherit";
  customForm.focus();

  wage.value = "";
  customForm.value = "";
  // hide chart from previous salary
  chart.style.display = "inherit";
  chart.innerHTML = "";
  output.style.display = "none";
  warning.style.display = "none";
  intWarning.style.display = "none";

  status.classList.add("custom");
  status.classList.remove("full", "part", "annual", "compare", "btn-danger");
  compare.classList.remove("btn-danger");
  hourWage.placeholder = "Hourly Rate";
  customForm.placeholder = "Custom Hours Per Week";
  // Change button color when active
  pt.classList.remove("btn-danger");
  pt.classList.add("btn-primary");
  ft.classList.remove("btn-danger");
  ft.classList.add("btn-primary");
  customButton.classList.remove("btn-primary");
  customButton.classList.add("btn-danger");
  salaryToHour.classList.remove("btn-danger");
  salaryToHour.classList.add("btn-primary");
}

function addCompare() {
  salOut.style.display = "none";
  status.classList.remove("full", "custom", "annual", "part");
  customForm.style.display = "none";
  output.style.display = "none";
  warning.style.display = "none";
  chart.innerHTML = "";
  chart.style.visibility = "hidden";
  chartType.style.display = "none";
  status.classList.add("compare");
  customForm.style.display = "inherit";
  hourWage.placeholder = "Hourly Rate #1";
  customForm.placeholder = "Hourly Rate #2";
  intWarning.style.display = "none";

  //change button color when clicked
  ft.classList.remove("btn-danger");
  ft.classList.add("btn-primary");
  customButton.classList.remove("btn-danger");
  customButton.classList.add("btn-primary");
  pt.classList.add("btn-primary");
  pt.classList.remove("btn-danger");
  salaryToHour.classList.remove("btn-danger");
  compare.classList.add("btn-danger");
}

// Change class of status
function addPT() {
  salOut.style.display = "none";
  wage.value = "";
  chart.innerHTML = "";
  chart.style.visibility = "hidden";
  status.classList.remove("full", "custom", "annual", "compare");
  compare.classList.remove("btn-danger");
  customForm.style.display = "none";
  status.classList.add("part");
  wage.placeholder = "Hourly Rate";
  intWarning.style.display = "none";
  //change button color when clicked
  ft.classList.remove("btn-danger");
  ft.classList.add("btn-primary");
  customButton.classList.remove("btn-danger");
  customButton.classList.add("btn-primary");
  pt.classList.remove("btn-primary");
  pt.classList.add("btn-danger");
  salaryToHour.classList.remove("btn-danger");
  salaryToHour.classList.add("btn-primary");
}

function addFT() {
  salOut.style.display = "none";
  wage.value = "";
  chart.style.visibility = "hidden";
  chart.innerHTML = "";
  status.classList.remove("part", "custom", "annual", "compare");
  compare.classList.remove("btn-danger");
  customForm.style.display = "none";
  status.classList.add("full");
  intWarning.style.display = "none";
  wage.placeholder = "Hourly Rate";
  //change button color when clicked
  pt.classList.remove("btn-danger");
  pt.classList.add("btn-primary");
  customButton.classList.remove("btn-danger");
  customButton.classList.add("btn-primary");
  ft.classList.remove("btn-primary");
  ft.classList.add("btn-danger");
  salaryToHour.classList.remove("btn-danger");
  salaryToHour.classList.add("btn-primary");
}

function addToHourly() {
  chart.style.visibility = "hidden";
  chart.innerHTML = "";
  output2.style.display = "none";
  output.style.display = "none";
  warning.style.display = "none";
  wage.value = "";
  customForm.style.display = "none";
  wage.placeholder = "Annual Salary: No Commas";
  intWarning.style.display = "none";
  status.classList.add("annual");
  status.classList.remove("full", "part", "custom", "compare");
  compare.classList.remove("btn-danger");

  //change button colors
  ft.classList.remove("btn-danger");
  ft.classList.add("btn-primary");
  customButton.classList.remove("btn-danger");
  customButton.classList.add("btn-primary");
  pt.classList.remove("btn-danger");
  pt.classList.add("btn-primary");
  salaryToHour.classList.add("btn-danger");
}

function salWarn() {
  warning.style.display = "inherit";
  warning.textContent =
    "*Results based on 40 hour work week. Gross income, taxes not included.";
}

// Open Behance page in new tab
function behance() {
  window.open(
    "https://www.behance.net/gallery/59412871/Employ-App-Advertising",
    "_blank"
  );
}

// clear output if form value is empty
function emptyForm() {
  if (wage.value == "") {
    output.style.display = "none";
    warning.style.display = "none";
    plug.style.display = "";
    chart.style.visibility = "hidden";
    salOut.style.display = "none";
    chartType.style.display = "none";
    checkForm();
  }
}

function intWarn() {
  intWarning.style.display = "inherit";
  intWarning.innerHTML = `<div id ="outContainer">
                          <p>
                          <p><strong>Please insert a Numerical Value.</strong></p>
                          </p>
                          </div>`;
}
//Run clear form every second
setInterval(emptyForm, 100);

// Event handlers for graph buttons
let area = document.getElementById("area");
let line = document.getElementById("line");
let scatter = document.getElementById("scatter");

area.addEventListener("click", areaFunc);
line.addEventListener("click", lineFunc);
scatter.addEventListener("click", scatFunc);

function areaFunc() {
  let chart = chartType.value;
  chart = "area";

  area.classList.replace("btn-warning", "btn-danger")
  line.classList.replace("btn-danger", "btn-warning")
  scatter.classList.replace("btn-danger", "btn-warning")

  if (status.classList.value == "compare") {
    compareGraph(fullTimeHoursWorked, chart);
  } else {
    getChart(chart);
  }
}

function lineFunc() {
  let chart = chartType.value;
  chart = "line";
  //update button colors
  scatter.classList.replace("btn-danger", "btn-warning")
  area.classList.replace("btn-danger", "btn-warning")
  line.classList.replace("btn-warning", "btn-danger")

  if (status.classList.value == "compare") {
    compareGraph(fullTimeHoursWorked, chart);
  } else {
    getChart(chart);
  }
}

function scatFunc() {
  let chart = chartType.value;
  chart = "scatter";

  scatter.classList.replace("btn-warning", "btn-danger")
  area.classList.replace("btn-danger", "btn-warning")
  line.classList.replace("btn-danger", "btn-warning")

  if (status.classList.value == "compare") {
    compareGraph(fullTimeHoursWorked, chart);
  } else {
    getChart(chart);
  }
}
=======
//1/8/2018  v0.06
//1/14/2018  v0.07 salary to Hour added
//1/29/2018  v0.08 Tweak decimal points position.
//3/3/2018  v0.09 Added compare. also added bugs.
//3/21/2018 Attempting to fix bugs, lol.
// April 1 - stuff worked on
// September 3 - visual redesign
// Added Apexchart 11/7/2018
// 11/8/2018 Apexchat improvements
// 11/12/2018 Fix some stuff, broke some stuff
// 11/14/2018 Fixed Graph issue, graph now updates correctly.
//11/16/2018 Apexchart fully intergared bug free
//11/19/2018 added different chart type
//10/14/2019 - bug fixes

// Reference locations
let wage = document.getElementById("hourWage");
let output = document.getElementById("output");
let output2 = document.getElementById("output2");
let warning = document.getElementById("warning");
let plug = document.getElementById("plug");
let ft = document.getElementById("fullTime");
let pt = document.getElementById("partTime");
let customButton = document.getElementById("custom");
let status = document.getElementById("status");
let customForm = document.getElementById("customForm");
let salaryToHour = document.getElementById("salaryHour");
let compare = document.getElementById("compare");
let check = document.getElementById("check");
let intWarning = document.getElementById("intWarning");
let updateChart = document.querySelector("#chart");
let salOut = document.querySelector("#salaryOutput");
let chartType = document.querySelector("#chartBtn");
chartType.value = "area";

//Hours worked
let fullTimeHoursWorked = [2080, 1440, 960, 480, 160, 0];
let partTimeHoursWorked = [1392, 1044, 696, 348, 116, 0];
let weeks = [52, 36, 26, 12, 4, 2, 1, 0];

//Graphic Reference locations
let graphWage = document.getElementById("hourWage");
let container = document.querySelector(".container");
let rate = graphWage.value;
let weekRate = rate * customForm.value;

//Compare Chart reference values
let hour1 = hourWage.value;
let hour2 = customForm.value;

wage.addEventListener("keyup", checkForm);

function checkForm() {
  if (wage.value.length > 0) {
    check.removeAttribute("disabled");
  } else {
    check.setAttribute("disabled", "");
  }
}

//Input field has focus
wage.focus();

//checks class of status
let statusClass = () => {
  console.log(status.classList.value);
  status.textContent = status.classList.value;
}

// Event listner for buttons.
// Main event listners in check status
check.addEventListener("click", checkStatus);
check.addEventListener("click", statusClass);

//Buttons
ft.addEventListener("click", addFT);
pt.addEventListener("click", addPT);
customButton.addEventListener("click", addCustom);
plug.addEventListener("click", behance);
salaryToHour.addEventListener("click", addToHourly);
compare.addEventListener("click", addCompare);

// Checks class to see which function needs to run.
function checkStatus() {
  //CUSTOM
  if (status.classList.value == "custom") {
    if (isNaN(wage.value) || wage.value == "") {
      warning.style.display = "none";
      intWarn();
    } else {
      customHours();
      getChart(chartType.value);
    }
    //FULL TIME
  } else if (status.classList.value == "full") {
    if (isNaN(wage.value) || wage.value == "") {
      warning.style.display = "none";
      //out Int Warning
      intWarn();
    } else {
      ftSalary();
      getChart(chartType.value);
    }
    // PART TIME
  } else if (status.classList.value == "part") {
    if (isNaN(wage.value) || wage.value == "") {
      warning.style.display = "none";
      intWarn();
    } else {
      ptSalary();
      getChart(chartType.value);
    }
    //ANNUAL
  } else if (status.classList.value == "annual") {
    if (isNaN(wage.value) || wage.value == "") {
      warning.style.display = "none";
      intWarn();
    } else {
      findHourly();
    }
    //COMPARE
  } else if (status.classList.value == "compare") {
    if (isNaN(wage.value) || wage.value == "") {
      warning.style.display = "none";
      intWarn();
    } else {
      compareGraph(fullTimeHoursWorked, chartType.value);
      compareSalaries(hour1, hour2);
    }
  }
}

//Create Graph for Single Salaries
function getChart(type) {
  //Clear old chart
  chart.style.visibility = "inherit";
  chart.innerHTML = "";
  //Update values when function runs
  // rate = graphWage.value;
  weekRate = rate * customForm.value;

  // Check to see which dataset to use for graph
  if (status.classList.value == "custom") {
    graphData(weekRate, weeks);
  } else if (status.classList.value == "full") {
    graphData(rate, fullTimeHoursWorked);
  } else if (status.classList.value == "part") {
    graphData(rate, partTimeHoursWorked);
  } else if (status.classList.value == "annual") {
  }

  function graphData(rate, dataSet) {
    let oneYear = Math.floor(rate * dataSet[0]);
    let nineMonth = Math.floor(rate * dataSet[1]);
    let sixMonth = Math.floor(rate * dataSet[2]);
    let threeMonth = Math.floor(rate * dataSet[3]);
    let oneMonth = Math.floor(rate * dataSet[4]);

    if (rate) {
      let options = {
        chart: {
          height: 400,
          type: `${type}`
        },
        series: [
          {
            name: "Salary",
            data: [oneMonth, threeMonth, sixMonth, nineMonth, oneYear]
          }
        ],
        xaxis: {
          categories: ["1", "3", "6", "9", "12"],
          title: {
            text: "Months",
            style: {
              fontSize: "20px"
            }
          }
        },
        yaxis: {
          title: {
            text: "Salary",
            style: {
              fontSize: "20px"
            }
          }
        }
      };

      let chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }
  }
  chartType.style.display = "inherit";
}

function compareGraph(time, type) {
  chartType.style.display = "inherit";
  chart.style.visibility = "inherit";
  let newData1 = new Array();
  let newData2 = new Array();
  let hour1 = hourWage.value;
  let hour2 = customForm.value;

  //Calculating and values pushing to empty array(s)
  time.forEach(hour => {
    let sal1 = hour1 * hour;
    let sal2 = hour2 * hour;
    newData1.push(sal1);
    newData2.push(sal2);
  });

  let options = {
    chart: {
      type: `${type}`
    },
    series: [
      {
        name: "Salary 1",
        data: [newData1[4], newData1[3], newData1[2], newData1[1], newData1[0]]
      },
      {
        name: "Salary 2",
        data: [newData2[4], newData2[3], newData2[2], newData2[1], newData2[0]]
      }
    ],
    xaxis: {
      categories: [1, 3, 6, 9, 12]
    }
  };

  if (updateChart.classList.value === "create") {
    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    updateChart.classList.replace("create", "update");
    salWarn();
  } else if ((updateChart.classList.value = "update")) {
    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    chart.updateSeries([
      {
        name: "Salary 1",
        data: [newData1[4], newData1[3], newData1[2], newData1[1], newData1[0]]
      },
      {
        name: "Salary 2",
        data: [newData2[4], newData2[3], newData2[2], newData2[1], newData2[0]]
      }
    ]);
  }
  salWarn();
}

function calResults(
  oneYear,
  nineMonth,
  sixMonth,
  threeMonth,
  oneMonth,
  weeklyCheck,
  overTime,
  biWeekly
) {
  output.innerHTML = `<div id ="outContainer">
                            <h4> Hourly Rate: ${wage.value}</h4>
                            <hr>
                            <p>
                            <strong class="title">Annual Salary:</strong><span class="dollar">$</span>${oneYear.toLocaleString()}<br>
                            <strong class="title">9 Month Salary:</strong><span class="dollar">$</span>${nineMonth.toLocaleString()}<br>
                            <strong class="title">6 Month Salary:</strong><span class="dollar">$</span>${sixMonth.toLocaleString()}<br>
                            <strong class="title">3 Month Salary:</strong><span class="dollar">$</span>${threeMonth.toLocaleString()}<br>
                            <strong class="title">1 Month Salary:</strong><span class="dollar">$</span>${oneMonth.toLocaleString()}<br>
                            <strong class="title">Bi-Weekly Check:</strong><span class="dollar">$</span>${biWeekly.toLocaleString()}<br>
                            <strong class="title">Weekly Check:</strong><span class="dollar">$</span>${weeklyCheck.toLocaleString()}<br>
                            <strong class="title">Overtime Rate:</strong><span class="dollar">$</span>${overTime.toLocaleString()}<br>
                            </p>
                        </div>`;
}

function ftSalary() {
  let oneYear = Math.floor(wage.value * fullTimeHoursWorked[0]);
  let nineMonth = Math.floor(wage.value * fullTimeHoursWorked[1]);
  let sixMonth = Math.floor(wage.value * fullTimeHoursWorked[2]);
  let threeMonth = Math.floor(wage.value * fullTimeHoursWorked[3]);
  let oneMonth = Math.floor(wage.value * fullTimeHoursWorked[4]);
  let weeklyCheck = Math.floor(wage.value * 40);
  let overTime = wage.value * 1.5;
  let biWeekly = Math.floor(wage.value * 80);

  calResults(
    oneYear,
    nineMonth,
    sixMonth,
    threeMonth,
    oneMonth,
    weeklyCheck,
    overTime,
    biWeekly
  );

  output.style.display = "inherit"; //Output DIV
  warning.style.display = "inherit"; // Disclaimer
  ft.style.visibility = "visible"; // Button displays
  pt.style.visibility = "visible";
  warning.textContent =
    "*Results based on 40 hour work week. Gross income, taxes not included.";

  status.classList.remove("custom");
  status.classList.remove("part");
  customForm.style.display = "none";
  status.classList.add("full");
  status.innerHTML = "<strong>Full-Time Hours</strong>";
}

function ptSalary() {
  let oneYear = Math.floor(wage.value * partTimeHoursWorked[0]);
  let nineMonth = Math.floor(wage.value * partTimeHoursWorked[1]);
  let sixMonth = Math.floor(wage.value * partTimeHoursWorked[2]);
  let threeMonth = Math.floor(wage.value * partTimeHoursWorked[3]);
  let oneMonth = Math.floor(wage.value * partTimeHoursWorked[4]);
  let biWeekly = Math.floor(wage.value * 58);
  let weeklyCheck = Math.floor(wage.value * 29); //40
  let overTime = wage.value * 1.5;

  calResults(
    oneYear,
    nineMonth,
    sixMonth,
    threeMonth,
    oneMonth,
    weeklyCheck,
    overTime,
    biWeekly
  );

  warning.style.display = "inherit";
  output.style.display = "inherit";
  ft.style.visibility = "visible";
  pt.style.visibility = "visible";
  warning.textContent =
    "*Results based on 29 hour work week. Gross income, taxes not included.";

  status.classList.remove("full");
  status.classList.add("part");
  status.innerHTML = "<strong>Part-Time Hours</strong>";
}

function customHours() {
  let pay = wage.value;
  let hours = customForm.value;
  //check to ensure values input are numbers.
  if (isNaN(pay) || isNaN(hours)) {
    output.style.display = "inherit";
    output.innerHTML = `<div id ="outContainer">
                            <p>
                            <p><strong>Please insert a Numerical Value.</strong></p>
                            </p>
                            </div>`;
  } else if (pay > 0) {
    output.style.display = "inherit";
    // Salary per week
    let salary = pay * hours;
    output.innerHTML = `<div id ="outContainer">
                            <h4> Hourly Rate: ${pay}</h4>
                            <hr>
                            <p>
                            <strong class="title">Annual Salary:</strong><span class="dollar">$</span>${(
        salary * weeks[0]
      ).toLocaleString()}<br>
                            <strong class="title">9 Month Salary:</strong><span class="dollar">$</span>${(
        salary * weeks[1]
      ).toLocaleString()}<br>
                            <strong class="title">6 Month Salary:</strong><span class="dollar">$</span>${(
        salary * weeks[2]
      ).toLocaleString()}<br>
                            <strong class="title">3 Month Salary:</strong><span class="dollar">$</span>${(
        salary * weeks[3]
      ).toLocaleString()}<br>
                            <strong class="title">1 Month Salary:</strong><span class="dollar">$</span>${(
        salary * weeks[4]
      ).toLocaleString()}<br>
                            <strong class="title">Bi-Weekly Check:</strong><span class="dollar">$</span>${(
        salary * weeks[5]
      ).toLocaleString()}<br>
                            <strong class="title">Weekly Check:</strong><span class="dollar">$</span>${(
        salary * weeks[6]
      ).toLocaleString()}<br>
                            <strong class="title">Overtime Rate:</strong><span class="dollar">$</span>${(
        pay * 1.5
      ).toLocaleString()}<br>
                            </p>
                        </div>`;
  }
  warning.style.display = "inherit";
  warning.textContent =
    "*Results based on custom hour work week. Gross income, taxes not included.";
}

function findHourly() {
  let fts = (wage.value / 2080).toFixed(2);
  let pts = (wage.value / 1392).toFixed(2);

  if (fts <= 0 || pts <= 0) {
    output.style.display = "none";
  } else if (isNaN(fts) || isNaN(pts)) {
    warning.style.display = "none";
    output.style.display = "inherit";
    output.innerHTML = `<div id ="outContainer">
                            <p>
                            <p><strong>Please insert a Numerical Value.</strong></p>
                            </p>
                            </div>`;
  } else {
    salOut.style.display = "inherit";
    salOut.innerHTML = `<div id ="outContainer">
                            <p>
                            <strong class="title">Annual Full-time Hourly(40 hours):</strong><span class="dollar">$</span>${fts}<br>
                            <strong class="title">Annual Part-time Hourly(29 Hours)</strong><span class="dollar">$</span>${pts}<br>
                            </p>
                            </div>`;
  }
}

function compareSalaries() {
  let hour1 = hourWage.value;
  let hour2 = customForm.value;

  let oneYear = Math.floor(hour1 * fullTimeHoursWorked[0]);
  let nineMonth = Math.floor(hour1 * fullTimeHoursWorked[1]);
  let sixMonth = Math.floor(hour1 * fullTimeHoursWorked[2]);
  let threeMonth = Math.floor(hour1 * fullTimeHoursWorked[3]);
  let oneMonth = Math.floor(hour1 * fullTimeHoursWorked[4]);
  let weeklyCheck = Math.floor(hour1 * 40);
  let overTime = hour1 * 1.5;
  let biWeekly = Math.floor(hour1 * 80);

  let oneYear2 = Math.floor(hour2 * fullTimeHoursWorked[0]);
  let nineMonth2 = Math.floor(hour2 * fullTimeHoursWorked[1]);
  let sixMonth2 = Math.floor(hour2 * fullTimeHoursWorked[2]);
  let threeMonth2 = Math.floor(hour2 * fullTimeHoursWorked[3]);
  let oneMonth2 = Math.floor(hour2 * fullTimeHoursWorked[4]);
  let weeklyCheck2 = Math.floor(hour2 * 40);
  let overTime2 = hour2 * 1.5;
  let biWeekly2 = Math.floor(hour2 * 80);

  output.style.display = "inherit";
  output.innerHTML = `<div id ="outContainer">
                        <h4 class="compare-title">
                        <strong>Rate 1:</strong><span class="dollar">$</span><span class="rateColor1">${hour1}</span></strong><br>
                        <strong>Rate 2:</strong><span class="dollar">$</span><span class="rateColor2">${hour2}</span></strong>
                        </h4>

                        <hr>

                        <strong class="title">Annual Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${oneYear.toLocaleString()}</span>
                        | <span class="dollar">$</span><span class="rateColor2">${oneYear2.toLocaleString()}</span><br>

                        <strong class="title">9 Months Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${nineMonth2.toLocaleString()}</span>
                        | <span class="dollar">$</span><span class="rateColor2">${nineMonth.toLocaleString()}</span><br>

                        <strong class="title">6 Months Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${sixMonth.toLocaleString()}</span>
                        | <span class="dollar">$</span><span class="rateColor2">${sixMonth2.toLocaleString()}</span><br>

                        <strong class="title">3 Months Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${threeMonth.toLocaleString()}</span>
                        | <span class="dollar">$</span><span class="rateColor2">${threeMonth2.toLocaleString()}</span><br>

                        <strong class="title">1 Month Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${oneMonth.toLocaleString()}</span>
                        | <span class="dollar">$</span><span class="rateColor2">${oneMonth2.toLocaleString()}</span><br>

                        <strong class="title">Biweekly Check:</strong><span class="dollar">$</span> <span class="rateColor1">${biWeekly.toLocaleString()}</span>
                        | <span class="dollar">$</span><span class="rateColor2">${biWeekly2.toLocaleString()}</span><br>

                        <strong class="title">Weekly Check:</strong><span class="dollar">$</span> <span class="rateColor1">${weeklyCheck.toLocaleString()}</span>
                        | <span class="dollar">$</span><span class="rateColor2">${weeklyCheck2.toLocaleString()}</span><br>

                        <strong class="title">Overtime Rate:</strong><span class="dollar">$</span> <span class="rateColor1">${overTime.toLocaleString()}</span>
                        | <span class="dollar">$</span><span class="rateColor2">${overTime2.toLocaleString()}</span><br>
                       </div>`;
}

// Bring up form for custom hour input
function addCustom() {
  salOut.style.display = "none";
  customForm.style.display = "inherit";
  customForm.focus();

  wage.value = "";
  customForm.value = "";
  // hide chart from previous salary
  chart.style.display = "inherit";
  chart.innerHTML = "";
  output.style.display = "none";
  warning.style.display = "none";
  intWarning.style.display = "none";

  status.classList.add("custom");
  status.classList.remove("full", "part", "annual", "compare", "btn-danger");
  compare.classList.remove("btn-danger");
  hourWage.placeholder = "Hourly Rate";
  customForm.placeholder = "Custom Hours Per Week";
  // Change button color when active
  pt.classList.remove("btn-danger");
  pt.classList.add("btn-primary");
  ft.classList.remove("btn-danger");
  ft.classList.add("btn-primary");
  customButton.classList.remove("btn-primary");
  customButton.classList.add("btn-danger");
  salaryToHour.classList.remove("btn-danger");
  salaryToHour.classList.add("btn-primary");
}

function addCompare() {
  salOut.style.display = "none";
  status.classList.remove("full", "custom", "annual");
  customForm.style.display = "none";
  output.style.display = "none";
  warning.style.display = "none";
  chart.innerHTML = "";
  chart.style.visibility = "hidden";
  status.classList.add("compare");
  customForm.style.display = "inherit";
  hourWage.placeholder = "Hourly Rate #1";
  customForm.placeholder = "Hourly Rate #2";
  intWarning.style.display = "none";

  //change button color when clicked
  ft.classList.remove("btn-danger");
  ft.classList.add("btn-primary");
  customButton.classList.remove("btn-danger");
  customButton.classList.add("btn-primary");
  pt.classList.add("btn-primary");
  pt.classList.remove("btn-danger");
  salaryToHour.classList.remove("btn-danger");
  compare.classList.add("btn-danger");
}

// Change class of status
function addPT() {
  salOut.style.display = "none";
  wage.value = "";
  chart.innerHTML = "";
  chart.style.visibility = "hidden";
  status.classList.remove("full", "custom", "annaul");
  compare.classList.remove("btn-danger");
  customForm.style.display = "none";
  status.classList.add("part");
  wage.placeholder = "Hourly Rate";
  intWarning.style.display = "none";
  //change button color when clicked
  ft.classList.remove("btn-danger");
  ft.classList.add("btn-primary");
  customButton.classList.remove("btn-danger");
  customButton.classList.add("btn-primary");
  pt.classList.remove("btn-primary");
  pt.classList.add("btn-danger");
  salaryToHour.classList.remove("btn-danger");
  salaryToHour.classList.add("btn-primary");
}

function addFT() {
  salOut.style.display = "none";
  wage.value = "";
  chart.style.visibility = "hidden";
  chart.innerHTML = "";
  status.classList.remove("part", "custom", "annaul", "compare");
  compare.classList.remove("btn-danger");
  customForm.style.display = "none";
  status.classList.add("full");
  intWarning.style.display = "none";
  wage.placeholder = "Hourly Rate";
  //change button color when clicked
  pt.classList.remove("btn-danger");
  pt.classList.add("btn-primary");
  customButton.classList.remove("btn-danger");
  customButton.classList.add("btn-primary");
  ft.classList.remove("btn-primary");
  ft.classList.add("btn-danger");
  salaryToHour.classList.remove("btn-danger");
  salaryToHour.classList.add("btn-primary");
}

function addToHourly() {
  chart.style.visibility = "hidden";
  chart.innerHTML = "";
  output2.style.display = "none";
  output.style.display = "none";
  warning.style.display = "none";
  wage.value = "";
  customForm.style.display = "none";
  wage.placeholder = "Annual Salary: No Commas";
  intWarning.style.display = "none";
  status.classList.add("annual");
  status.classList.remove("full", "part", "custom", "compare");
  compare.classList.remove("btn-danger");

  //change button colors
  ft.classList.remove("btn-danger");
  ft.classList.add("btn-primary");
  customButton.classList.remove("btn-danger");
  customButton.classList.add("btn-primary");
  pt.classList.remove("btn-danger");
  pt.classList.add("btn-primary");
  salaryToHour.classList.add("btn-danger");
}

function salWarn() {
  warning.style.display = "inherit";
  warning.textContent =
    "*Results based on 40 hour work week. Gross income, taxes not included.";
}

// Open Behance page in new tab
function behance() {
  window.open(
    "https://www.behance.net/gallery/59412871/Employ-App-Advertising",
    "_blank"
  );
}

// clear output if form value is empty
function emptyForm() {
  if (wage.value == "") {
    output.style.display = "none";
    warning.style.display = "none";
    plug.style.display = "";
    chart.style.visibility = "hidden";
    salOut.style.display = "none";
    chartType.style.display = "none";
    checkForm();
  }
}

function intWarn() {
  intWarning.style.display = "inherit";
  intWarning.innerHTML = `<div id ="outContainer">
                          <p>
                          <p><strong>Please insert a Numerical Value.</strong></p>
                          </p>
                          </div>`;
}
//Run clear form every second
setInterval(emptyForm, 1000);

// Event handlers for graph buttons
let area = document.getElementById("area");
let bar = document.getElementById("bar");
let histogram = document.getElementById("histogram");
let line = document.getElementById("line");
let scatter = document.getElementById("scatter");

area.addEventListener("click", areaFunc);
bar.addEventListener("click", barFunc);
histogram.addEventListener("click", hisFunc);
line.addEventListener("click", lineFunc);
scatter.addEventListener("click", scatFunc);

function areaFunc() {
  let chart = chartType.value;
  chart = "area";
  if (status.classList.value == "compare") {
    compareGraph(fullTimeHoursWorked, chart);
  } else {
    getChart(chart);
  }
}

function barFunc() {
  let chart = chartType.value;
  chart = "bar";
  if (status.classList.value == "compare") {
    compareGraph(fullTimeHoursWorked, chart);
  } else {
    getChart(chart);
  }
}

function hisFunc() {
  let chart = chartType.value;
  chart = "histogram";
  if (status.classList.value == "compare") {
    compareGraph(fullTimeHoursWorked, chart);
  } else {
    getChart(chart);
  }
}

function lineFunc() {
  let chart = chartType.value;
  chart = "line";
  if (status.classList.value == "compare") {
    compareGraph(fullTimeHoursWorked, chart);
  } else {
    getChart(chart);
  }
}

function scatFunc() {
  let chart = chartType.value;
  chart = "scatter";
  if (status.classList.value == "compare") {
    compareGraph(fullTimeHoursWorked, chart);
  } else {
    getChart(chart);
  }
}
