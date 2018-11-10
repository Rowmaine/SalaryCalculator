//Romaine Raffington 1/8/2018  v0.06
//Romaine Raffington 1/14/2018  v0.07 salary to Hour added
//Romaine Raffington 1/29/2018  v0.08 Tweak decimal points position.
//Romaine Raffington 3/3/2018  v0.09 Added compare. also added bugs.
//3/21/2018 Attempting to fix bugs, lol.
// April 1 - stuff worked on
// September 3 - visual redesign
// Added Apexchart 11/7/2018
// 11/8/2018Apexchat improvements

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

let fullTimeHoursWorked = [2080, 1440, 960, 480, 160];
let partTimeHoursWorked = [1392, 1044, 696, 348, 116];

//Graphic Reference locations
let graphWage = document.getElementById("hourWage");
let container = document.querySelector(".container");

//Input field has focus
wage.focus();

// Event listner for buttons.
check.addEventListener("click", checkStatus);
ft.addEventListener("click", addFT);
pt.addEventListener("click", addPT);
customButton.addEventListener("click", addCustom);
plug.addEventListener("click", behance);
salaryToHour.addEventListener("click", addToHourly);
compare.addEventListener("click", addCompare);
// Event listners for Graph
check.addEventListener("click", getChart);

// Checks class to see which function needs to run.
function checkStatus() {
  if (status.classList.value == "custom") {
    customHours();
  } else if (status.classList.value == "full") {
    ftSalary();
    getChart();
  } else if (status.classList.value == "part") {
    ptSalary();
    getChart();
  } else if (status.classList.value == "annual") {
    findHourly();
  } else if (status.classList.value == "compare") {
    compareSalaries();
  }
}

function getChart() {
  //Clear old chart
  let chart = document.querySelector("#chart");
  chart.style.visibility = "inherit";
  chart.innerHTML = "";
  //Salary Information for full time hours

  if (status.classList.value == "custom") {
    console.log("custom");
  } else if (status.classList.value == "full") {
    console.log("full");
    graphData();
  } else if (status.classList.value == "part") {
    console.log("part");
    graphData();
  } else if (status.classList.value == "annual") {
    console.log("annaul");
  } else if (status.classList.value == "compare") {
    console.log("compare");
  }

  function graphData() {
    let hourlyRate = graphWage.value;
    let oneYear = Math.floor(hourlyRate * fullTimeHoursWorked[0]);
    let nineMonth = Math.floor(hourlyRate * fullTimeHoursWorked[1]);
    let sixMonth = Math.floor(hourlyRate * fullTimeHoursWorked[2]);
    let threeMonth = Math.floor(hourlyRate * fullTimeHoursWorked[3]);
    let oneMonth = Math.floor(hourlyRate * fullTimeHoursWorked[4]);

    if (graphWage.value > 0) {
      var options = {
        chart: {
          height: 400,
          type: "line"
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
            text: "Month(s)",
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
      graphWage.classList.add("list-created");
    }
  }
}

function ftSalary() {
  if (isNaN(wage.value)) {
    output.style.display = "inherit";
    output.innerHTML = `<div id ="outContainer">
                            <p>
                            <p><strong>Please insert a Numerical Value.</strong></p>
                            </p>
                            </div>`;
  } else if (wage.value.length > 0) {
    let oneYear = Math.floor(wage.value * 2080);
    let sixMonth = Math.floor(wage.value * 960);
    let threeMonth = Math.floor(wage.value * 480);
    let oneMonth = Math.floor(wage.value * 160);
    let weeklyCheck = Math.floor(wage.value * 40);
    let overTime = wage.value * 1.5;
    let biWeekly = Math.floor(wage.value * 80);

    output.innerHTML = `<div id ="outContainer">
                            <h4> Hourly Rate: ${wage.value}</h4>
                            <hr>
                            <p>
                            <strong class="title">Annual Salary:</strong><span class="dollar">$</span>${oneYear.toLocaleString()}<br>
                            <strong class="title">6 Month Salary:</strong><span class="dollar">$</span>${sixMonth.toLocaleString()}<br>
                            <strong class="title">3 Month Salary:</strong><span class="dollar">$</span>${threeMonth.toLocaleString()}<br>
                            <strong class="title">1 Month Salary:</strong><span class="dollar">$</span>${oneMonth.toLocaleString()}<br>
                            <strong class="title">Bi-Weekly Check:</strong><span class="dollar">$</span>${biWeekly.toLocaleString()}<br>
                            <strong class="title">Weekly Check:</strong><span class="dollar">$</span>${weeklyCheck.toLocaleString()}<br>
                            <strong class="title">Overtime Rate:</strong><span class="dollar">$</span>${overTime.toLocaleString()}<br>
                            </p>
                        </div>`;

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
}

function ptSalary() {
  if (isNaN(wage.value)) {
    output.style.display = "inherit";
    output.innerHTML = `<div id ="outContainer">
                            <p>
                            <p><strong>Please insert a Numerical Value.</strong></p>
                            </p>
                            </div>`;
  } else if (wage.value.length > 0) {
    let oneYear = Math.floor(wage.value * partTimeHoursWorked[0]);
    let nineMonth = Math.floor(wage.value * partTimeHoursWorked[1]);
    let sixMonth = Math.floor(wage.value * partTimeHoursWorked[2]);
    let threeMonth = Math.floor(wage.value * partTimeHoursWorked[3]);
    let oneMonth = Math.floor(wage.value * partTimeHoursWorked[4]);
    let biWeekly = Math.floor(wage.value * 58);
    let weeklyCheck = Math.floor(wage.value * 29); //40
    let overTime = wage.value * 1.5;
    output.innerHTML = `<div id ="outContainer">
                            <h4> Hourly Rate: ${wage.value}</h4>
                            <hr>
                            <p>
                            <strong class="title">Annual Salary:</strong><span class="dollar">$</span>${oneYear.toLocaleString()}<br>
                            <strong class="title">6 Month Salary:</strong><span class="dollar">$</span>${sixMonth.toLocaleString()}<br>
                            <strong class="title">3 Month Salary:</strong><span class="dollar">$</span>${threeMonth.toLocaleString()}<br>
                            <strong class="title">1 Month Salary:</strong><span class="dollar">$</span>${oneMonth.toLocaleString()}<br>
                            <strong class="title">Bi-Weekly Check:</strong><span class="dollar">$</span>${biWeekly.toLocaleString()}<br>
                            <strong class="title">Weekly Check:</strong><span class="dollar">$</span>${weeklyCheck.toLocaleString()}<br>
                            <strong class="title">Overtime Rate:</strong><span class="dollar">$</span>${overTime.toLocaleString()}<br>
                            </p>
                        </div>`;

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
}

function customHours() {
  if (isNaN(wage.value) || isNaN(customForm.value)) {
    output.style.display = "inherit";
    output.innerHTML = `<div id ="outContainer">
                            <p>
                            <p><strong>Please insert a Numerical Value.</strong></p>
                            </p>
                            </div>`;
  } else if (wage.value.length > 0) {
    output.style.display = "inherit";
    let salary = wage.value * customForm.value;
    output.innerHTML = `<div id ="outContainer">
                            <h4> Hourly Rate: ${wage.value}</h4>
                            <hr>
                            <p>
                            <strong class="title">Annual Salary:</strong><span class="dollar">$</span>${(
                              salary * 52
                            ).toLocaleString()}<br>
                            <strong class="title">6 Month Salary:</strong><span class="dollar">$</span>${(
                              salary * 26
                            ).toLocaleString()}<br>
                            <strong class="title">3 Month Salary:</strong><span class="dollar">$</span>${(
                              salary * 12
                            ).toLocaleString()}<br>
                            <strong class="title">1 Month Salary:</strong><span class="dollar">$</span>${(
                              salary * 4
                            ).toLocaleString()}<br>
                            <strong class="title">Bi-Weekly Check:</strong><span class="dollar">$</span>${(
                              salary * 2
                            ).toLocaleString()}<br>
                            <strong class="title">Weekly Check:</strong><span class="dollar">$</span>${(
                              salary * 1
                            ).toLocaleString()}<br>
                            <strong class="title">Overtime Rate:</strong><span class="dollar">$</span>${(
                              wage.value * 1.5
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
    output.style.display = "inherit";
    output.innerHTML = `<div id ="outContainer">
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

  let oneYear = Math.floor(hour1 * 2080);
  let sixMonth = Math.floor(hour1 * 960);
  let threeMonth = Math.floor(hour1 * 480);
  let oneMonth = Math.floor(hour1 * 160);
  let weeklyCheck = Math.floor(hour1 * 40);
  let overTime = hour1 * 1.5;
  let biWeekly = Math.floor(hour1 * 80);

  let oneYear2 = Math.floor(hour2 * 2080);
  let sixMonth2 = Math.floor(hour2 * 960);
  let threeMonth2 = Math.floor(hour2 * 480);
  let oneMonth2 = Math.floor(hour2 * 160);
  let weeklyCheck2 = Math.floor(hour2 * 40);
  let overTime2 = hour2 * 1.5;
  let biWeekly2 = Math.floor(hour2 * 80);

  output.style.display = "inherit";
  output.innerHTML = `<div id ="outContainer">
                        <p class="compare-title">
                        <strong>Rate 1:</strong><span class="dollar">$</span><span class="rateColor1">${hour1}</span></strong><br>
                        <strong>Rate 2:</strong><span class="dollar">$</span><span class="rateColor2">${hour2}</span></strong>
                        </p>
                        
                        <strong class="title">Annual Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${oneYear.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${oneYear2.toLocaleString()}</span><br>
                        
                        <strong class="title">Six Month Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${sixMonth.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${sixMonth2.toLocaleString()}</span><br>

                        <strong class="title">Three Month Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${threeMonth.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${threeMonth2.toLocaleString()}</span><br>

                        <strong class="title">One Month Salary:</strong><span class="dollar">$</span> <span class="rateColor1">${oneMonth.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${oneMonth2.toLocaleString()}</span><br>

                        <strong class="title">Weekly Check:</strong><span class="dollar">$</span> <span class="rateColor1">${weeklyCheck.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${weeklyCheck2.toLocaleString()}</span><br>

                        <strong class="title">Biweekly Check:</strong><span class="dollar">$</span> <span class="rateColor1">${biWeekly.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${biWeekly2.toLocaleString()}</span><br>

                        <strong class="title">Overtime Rate:</strong><span class="dollar">$</span> <span class="rateColor1">${overTime.toLocaleString()}</span> 
                        | <span class="dollar">$</span><span class="rateColor2">${overTime2.toLocaleString()}</span><br>
                       </div>`;
}

// Bring up form for custom hour input
function addCustom() {
  customForm.style.display = "inherit";
  customForm.focus();
  wage.value = "";
  customForm.value = "";
  chart.style.visibility = "hidden";
  chart.innerHTML = "";
  output.style.display = "none";
  warning.style.display = "none";

  status.classList.remove("full");
  status.classList.remove("part");
  status.classList.remove("annual");
  status.classList.remove("compare");
  compare.classList.remove("btn-danger");
  status.classList.add("custom");
  hourWage.placeholder = "Hourly Rate";
  customForm.placeholder = "Custom Hours Per Week";
  status.innerHTML = "<strong>Custom-Hours</strong>";
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
  // remove other classes
  status.classList.remove("full");
  status.classList.remove("custom");
  status.classList.remove("annual");
  customForm.style.display = "none";
  chart.style.visibility = "hidden";
  chart.innerHTML = "";
  status.classList.add("compare");
  customForm.style.display = "inherit";
  hourWage.placeholder = "Hourly Rate #1";
  customForm.placeholder = "Hourly Rate #2";
  status.innerHTML = "<strong>Compare Rates</strong>";
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
  wage.value = "";
  chart.style.visibility = "hidden";
  chart.innerHTML = "";
  status.classList.remove("full");
  status.classList.remove("custom");
  status.classList.remove("annual");
  compare.classList.remove("btn-danger");
  customForm.style.display = "none";
  status.classList.add("part");
  wage.placeholder = "Hourly Rate";
  status.innerHTML = "<strong>Part-Time Hours</strong>";
  //change button color when clicked
  ft.classList.remove("btn-danger");
  ft.classList.add("btn-primary");
  customButton.classList.remove("btn-danger");
  customButton.classList.add("btn-primary");
  pt.classList.remove("btn-primary");
  pt.classList.add("btn-danger");
  salaryToHour.classList.remove("btn-danger");
  salaryToHour.classList.add("btn-primary");

  ptSalary();
}

function addFT() {
  wage.value = "";
  chart.style.visibility = "hidden";
  chart.innerHTML = "";
  status.classList.remove("part");
  status.classList.remove("custom");
  status.classList.remove("annual");
  status.classList.remove("compare");
  compare.classList.remove("btn-danger");
  customForm.style.display = "none";
  status.classList.add("full");
  status.innerHTML = "<strong>Full-Time Hours</strong>";
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

  ftSalary();
}

function addToHourly() {
  chart.style.visibility = "hidden";
  chart.innerHTML = "";
  output2.style.display = "none";
  output.style.display = "none";
  warning.style.display = "none";
  status.classList.remove("full");
  status.classList.remove("part");
  status.classList.remove("custom");
  status.classList.remove("compare");
  compare.classList.remove("btn-danger");
  status.classList.add("annual");
  wage.value = "";
  status.innerHTML = "<strong>Annual Salary</strong>";
  customForm.style.display = "none";
  wage.placeholder = "Annual Salary";

  //change button colors
  ft.classList.remove("btn-danger");
  ft.classList.add("btn-primary");
  customButton.classList.remove("btn-danger");
  customButton.classList.add("btn-primary");
  pt.classList.remove("btn-danger");
  pt.classList.add("btn-primary");
  salaryToHour.classList.add("btn-danger");
}

// Open Behance page in new tab
function behance() {
  let newJob = window.open(
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
  }
}

//Run clear form every second
setInterval(emptyForm, 100);
