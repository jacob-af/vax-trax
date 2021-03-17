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
    }).done((data) => {
      alert("Retrieved " + data.length + " records from the dataset!");
      console.log(data);
    });
  });
});
