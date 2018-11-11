let full = [2080, 1440, 960, 480, 160];
let part = [1392, 1044, 696, 348, 116];

function compareSalary() {
  let hour1 = 1;
  let hour2 = 12;

  full.forEach(hour => {
    console.log(hour * hour1);
  });
}

compareSalary();
