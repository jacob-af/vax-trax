$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/UserStory").then(() => {
    console.log("Story Loading");
  });

  const handleCategoryChange = e => {
    let newPostCategory = e.target.value;
    newPostCategory = newPostCategory.replaceAll(" ", "");
    console.log(category);
    window.location.href = "/" + newPostCategory;
    // $.ajax({
    //   url: "/public",
    //   method: "GET",
    //   data: {
    //     category: newPostCategory
    //   }
    // }).then(() => {
    //   console.log("success");
    // });
  };
  $("#category").on("change", handleCategoryChange);
});
