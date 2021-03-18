/* eslint-disable prettier/prettier */
$(document).ready(() => {
  const stateForm = $("form.state-search");
  const stateInput = $("#state-input");

  stateForm.on("submit", (event) => {
    event.preventDefault();

    const state = stateInput.val().trim();

    $.ajax({
      url: `https://data.cdc.gov/resource/w9zu-fywh.json?jurisdiction=${state}`,
      type: "GET",
      data: {
        $limit: 5000,
        // eslint-disable-next-line camelcase
        $$app_token: "hQ461wggNs20MAJ8r5CW9inzl",
      },
    }).done((data) => {});

    $.ajax({
      url: `https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json`,
      type: "GET",
    }).done((data) => {
      console.log(data);
    });

    $.ajax({
      url: `https://data.cdc.gov/resource/9mfq-cb36.json?state=MI`,
      type: "GET",
      data: {
        $limit: 5000,
        // eslint-disable-next-line camelcase
        $$app_token: "hQ461wggNs20MAJ8r5CW9inzl",
      },
    }).done((data) => {
      let dates = [];
      let deaths = [];
      let cases = [];
      data.sort((a, b) => (a.submission_date > b.submission_date ? 1 : -1));
      data.forEach((row) => {
        dates.push(row.submission_date);
        deaths.push(row.tot_death);
        cases.push(row.tot_cases);
      });
      console.log(dates, deaths);
      const deathData = document
        .getElementById("covid-deaths")
        .getContext("2d");
      const casesData = document.getElementById("covid-cases").getContext("2d");
      const deathChart = new Chart(deathData, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: dates,
          datasets: [
            {
              label: "Covid Deaths in Selected State",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: deaths,
              fill: false,
              pointStyle: "dash",
            },
          ],
        },
        // Configuration options go here
        options: {},
      });
      const casesChart = new Chart(casesData, {
        // The type of chart we want to create
        type: "line",
        // The data for our dataset
        data: {
          labels: dates,
          datasets: [
            {
              label: "Covid Cases in Selected State",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: cases,
              fill: false,
              pointStyle: "dash",
            },
          ],
        },
        // Configuration options go here
        options: {},
      });
    });
  });
});
