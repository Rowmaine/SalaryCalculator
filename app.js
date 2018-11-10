let graphWage = document.getElementById("input");
let createGraph = document.getElementById("createGraph");
let container = document.querySelector(".container");

// Event listners
check.addEventListener("click", getChart);
createGraph.addEventListener("click", getChart);

function getChart() {
  //Clear old chart
  let chart = document.querySelector("#chart");
  chart.innerHTML = "";
  //Salary Information
  let hourlyRate = graphWage.value;
  let oneYear = Math.floor(hourlyRate * 2080);
  let nineMonth = Math.floor(hourlyRate * 1440);
  let sixMonth = Math.floor(hourlyRate * 960);
  let threeMonth = Math.floor(hourlyRate * 480);
  let oneMonth = Math.floor(hourlyRate * 160);

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
          text: "Month(s)"
        }
      },
      yaxis: {
        title: {
          text: "Salary"
        }
      }
    };

    let chart = new ApexCharts(document.querySelector("#chart"), options);
    //Renders Chart
    chart.render();
    //Clear input form
    graphWage.value = "";
    graphWage.classList.add("list-created");
  }
  //  For Debugging purposes
  // console.log(options.series[0].data);
}
