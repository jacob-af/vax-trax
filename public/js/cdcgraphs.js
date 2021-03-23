$(document).ready(() => {
  const usStates = [
    { name: "MICHIGAN", abbreviation: "MI" },
    { name: "ALABAMA", abbreviation: "AL" },
    { name: "ALASKA", abbreviation: "AK" },
    { name: "ARIZONA", abbreviation: "AZ" },
    { name: "ARKANSAS", abbreviation: "AR" },
    { name: "CALIFORNIA", abbreviation: "CA" },
    { name: "COLORADO", abbreviation: "CO" },
    { name: "CONNECTICUT", abbreviation: "CT" },
    { name: "DELAWARE", abbreviation: "DE" },
    { name: "DISTRICT OF COLUMBIA", abbreviation: "DC" },
    { name: "FLORIDA", abbreviation: "FL" },
    { name: "GEORGIA", abbreviation: "GA" },
    { name: "HAWAII", abbreviation: "HI" },
    { name: "IDAHO", abbreviation: "ID" },
    { name: "ILLINOIS", abbreviation: "IL" },
    { name: "INDIANA", abbreviation: "IN" },
    { name: "IOWA", abbreviation: "IA" },
    { name: "KANSAS", abbreviation: "KS" },
    { name: "KENTUCKY", abbreviation: "KY" },
    { name: "LOUISIANA", abbreviation: "LA" },
    { name: "MAINE", abbreviation: "ME" },
    { name: "MARYLAND", abbreviation: "MD" },
    { name: "MASSACHUSETTS", abbreviation: "MA" },
    { name: "MINNESOTA", abbreviation: "MN" },
    { name: "MISSISSIPPI", abbreviation: "MS" },
    { name: "MISSOURI", abbreviation: "MO" },
    { name: "MONTANA", abbreviation: "MT" },
    { name: "NEBRASKA", abbreviation: "NE" },
    { name: "NEVADA", abbreviation: "NV" },
    { name: "NEW HAMPSHIRE", abbreviation: "NH" },
    { name: "NEW JERSEY", abbreviation: "NJ" },
    { name: "NEW MEXICO", abbreviation: "NM" },
    { name: "NEW YORK", abbreviation: "NY" },
    { name: "NORTH CAROLINA", abbreviation: "NC" },
    { name: "NORTH DAKOTA", abbreviation: "ND" },
    { name: "OHIO", abbreviation: "OH" },
    { name: "OKLAHOMA", abbreviation: "OK" },
    { name: "OREGON", abbreviation: "OR" },
    { name: "PENNSYLVANIA", abbreviation: "PA" },
    { name: "PUERTO RICO", abbreviation: "PR" },
    { name: "RHODE ISLAND", abbreviation: "RI" },
    { name: "SOUTH CAROLINA", abbreviation: "SC" },
    { name: "SOUTH DAKOTA", abbreviation: "SD" },
    { name: "TENNESSEE", abbreviation: "TN" },
    { name: "TEXAS", abbreviation: "TX" },
    { name: "UTAH", abbreviation: "UT" },
    { name: "VERMONT", abbreviation: "VT" },
    { name: "VIRGINIA", abbreviation: "VA" },
    { name: "WASHINGTON", abbreviation: "WA" },
    { name: "WEST VIRGINIA", abbreviation: "WV" },
    { name: "WISCONSIN", abbreviation: "WI" },
    { name: "WYOMING", abbreviation: "WY" }
  ];

  for (let i = 0; i < usStates.length; i++) {
    const option = document.createElement("option");
    option.text = usStates[i].name + " [" + usStates[i].abbreviation + "]";
    option.value = i;
    const select = document.getElementById("stateSelector");
    select.appendChild(option);
  }

  // $.ajax({
  //   url: `https://data.cdc.gov/resource/w9zu-fywh.json?jurisdiction=${state}`,
  //   type: "GET",
  //   data: {
  //     $limit: 5000,
  //     // eslint-disable-next-line camelcase
  //     $$app_token: "hQ461wggNs20MAJ8r5CW9inzl",
  //   },
  // }).done((data) => {});

  // $.ajax({
  //   url: "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json",
  //   type: "GET",
  // }).done((data) => {
  //   console.log(data);
  // });

  $.ajax({
    url: "/cdcdata",
    type: "GET"
  }).done(data => {
    const dates = [];
    const vaccination1 = [];
    const vaccination2 = [];
    const filterData = data.vaccination_trends_data.filter(
      datum => datum.Location === "US"
    );
    console.log(filterData);
    filterData.sort((a, b) => (a.Date > b.Date ? 1 : -1));
    filterData.forEach(row => {
      dates.push(row.Date);
      vaccination1.push(row.Admin_Dose_1_Cumulative);
      vaccination2.push(row.Admin_Dose_2_Cumulative);
    });
    const vaxData = document.getElementById("covid-vax").getContext("2d");
    const vaxChart = new Chart(vaxData, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "First Dose",
            backgroundColor: "#333333",
            borderColor: "#4C9595",
            data: vaccination1
          },
          {
            label: "Second Dose",
            backgroundColor: "#4C9595",
            borderColor: "#4C9595",
            data: vaccination2
          }
        ]
      },
      // Configuration options go here
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                // Abbreviate the millions
                callback: function(value) {
                  return value / 1e6 + "M";
                }
              }
            }
          ]
        }
      }
    });
    console.log(vaxChart);
  });
  const displayGraphs = state => {
    $.ajax({
      url:
        "https://data.cdc.gov/resource/9mfq-cb36.json?state=" +
        state.abbreviation,
      type: "GET",
      data: {
        $limit: 5000,
        // eslint-disable-next-line camelcase
        $$app_token: "hQ461wggNs20MAJ8r5CW9inzl"
      }
    }).done(data => {
      const dates = [];
      const deaths = [];
      const cases = [];
      data.sort((a, b) => (a.submission_date > b.submission_date ? 1 : -1));
      data.forEach(row => {
        dates.push(row.submission_date.replace("T00:00:00.000", ""));
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
              label: "Covid Deaths in " + state.name,
              backgroundColor: "#4C9595",
              borderColor: "#4C9595",
              data: deaths,
              fill: false,
              pointStyle: "dash"
            }
          ]
        },
        // Configuration options go here
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  // Abbreviate the millions
                  callback: function(value) {
                    return value / 1e3 + "K";
                  }
                }
              }
            ]
          }
        }
      });
      const casesChart = new Chart(casesData, {
        // The type of chart we want to create
        type: "line",
        // The data for our dataset
        data: {
          labels: dates,
          datasets: [
            {
              label: "Covid Cases in " + state.name,
              backgroundColor: "#4C9595",
              borderColor: "#4C9595",
              data: cases,
              fill: false,
              pointStyle: "dash"
            }
          ]
        },
        // Configuration options go here
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  // Abbreviate the millions
                  callback: function(value) {
                    return value / 1e3 + "K";
                  }
                }
              }
            ]
          }
        }
      });
      console.log(casesChart, deathChart);
    });
  };

  displayGraphs(usStates[0]);

  const handleStateChange = () => {
    const stateIndex = $("#stateSelector option:selected").val();
    displayGraphs(usStates[stateIndex]);
  };
  $("#stateSelector").change(() => handleStateChange());
});
