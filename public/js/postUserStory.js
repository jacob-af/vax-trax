// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  // Check for query string and set flag, "updating", to false initially
  const url = window.location.search;
  let postId;
  let updating = false;

  // Get a specific post
  const getPostData = id => {
    fetch(`/api/UserStory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log(`Success in grabbing post ${id}`, data);

          // Populate the form with the existing post
          dateInput.value = data.date;
          bodyInput.value = data.body;
          postCategorySelect.value = data.category;
          vaccine.value = data.vaccine;

          updating = true;
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  // Extract the post ID from the URL
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Get elements from the page
  const bodyInput = document.getElementById("body");
  const dateInput = document.getElementById("dateOfExperience");
  const userPostForm = document.getElementById("userPostForm");
  const postCategorySelect = document.getElementById("category");
  let vaccine;

  $("#my-btns .radio-inline").on("click", function() {
    console.log(
      $(this)
        .find("input")
        .val()
    );
    vaccine = $(this)
      .find("input")
      .val();
  });
  // Set default value for the category
  postCategorySelect.value = "General";

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!bodyInput.value) {
      alert("Your post is missing some content");
    }
    $.get("/api/user_data").then(data => {
      console.log(data.id);
      const newPost = {
        UserId: data.id,
        dateOfExperience: dateInput.value,
        body: bodyInput.value.trim(),
        category: postCategorySelect.value,
        vaccineType: vaccine
      };
      // Check if the user is updating or creating and preform said function
      if (updating) {
        newPost.id = postId;
        updatePost(newPost);
      } else {
        submitPost(newPost);
      }
    });
  };

  // Event listener for when the blog is submitted

  userPostForm.addEventListener("submit", handleFormSubmit);

  // Event handler for when a user submits a post
  const submitPost = post => {
    fetch("/api/UserStory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success in submitting post:", data);
        window.location.href = "/members";
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  // Update a post and bring user to /blog
  const updatePost = post => {
    fetch("/api/UserStory", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(() => {
        console.log("Attempting update to post");
        window.location.href = "/members";
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
});
