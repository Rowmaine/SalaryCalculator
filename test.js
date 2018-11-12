let check = document.getElementById("check");

check.addEventListener("click", compareGraph);

function compareGraph() {
  var options = {
    chart: {
      type: "line"
    },
    series: [
      {
        name: "Salary 1",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8]
      },
      {
        name: "Salary 2",
        data: [20, 29, 37, 36, 44]
      }
    ],
    xaxis: {
      categories: [1, 3, 6, 9, 12]
    }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}
