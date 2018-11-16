function updateSeries() {
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
