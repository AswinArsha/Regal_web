(function ($) {
  "use strict";

  // Debugging message to check if the script is running
  console.log("Script initialized");

  // Load the image index
  let portfolioItems = [];
  $.getJSON("js/imageIndex.json", function (data) {
    console.log("Data loaded successfully:", data); // Check if data is loaded
    portfolioItems = data;

    // Display portfolio items after data is loaded
    displayPortfolioItems();
  }).fail(function (jqxhr, textStatus, error) {
    const err = textStatus + ", " + error;
    console.error("Failed to load image index:", err); // Log any errors loading the JSON
  });

  // Global variables
  var currentPage = 1;
  var itemsPerPage = 9;
  var currentFilter = "*";

  // Function to filter portfolio items based on the current filter
  function filterPortfolioItems() {
    console.log("Current filter:", currentFilter); // Display the current filter

    if (currentFilter === "*") {
      return portfolioItems; // If filter is '*', return all items
    }

    const filteredItems = portfolioItems.filter((item) => {
      return item.category === currentFilter; // Filter by category
    });

    console.log("Filtered items:", filteredItems.length); // Check the number of matching items
    return filteredItems;
  }

  // Function to display portfolio items with pagination
  function displayPortfolioItems() {
    console.log("Displaying portfolio items"); // Ensure this runs
    const filteredItems = filterPortfolioItems();
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    const portfolioContainer = $("#portfolioContainer");
    portfolioContainer.empty(); // Clear existing content

    if (filteredItems.length === 0) {
      console.warn("No portfolio items to display"); // Warn if there are no items
    } else {
      // Add new items to the portfolio
      filteredItems.slice(startIdx, endIdx).forEach((item) => {
        console.log("Adding portfolio item:", item); // Log adding portfolio items
        const portfolioItem = $(`
          <div class="col-lg-4 col-md-6 mt-4 pt-2 ${item.category}">
            <div class="portfolio-box rounded shadow position-relative overflow-hidden">
              <div class="portfolio-box-img position-relative overflow-hidden">
                <img
                  src="${item.imageUrl}"
                  class="img-fluid"
                  style="object-fit: contain; object-position: center;"
                  alt="${item.category}"
                />
                <div class="overlay-work">
                  <div class="work-content text-center">
                    <a
                      href="${item.imageUrl}"
                      class="text-light work-icon bg-dark d-inline-block rounded-pill mfp-image"
                    >
                      <i data-feather="camera" class="fea icon-sm image-icon"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `);

        portfolioContainer.append(portfolioItem);
      });

      // Reinitialize Feather icons after adding content
      feather.replace(); // Important for Feather icons to render properly

      // Initialize Magnific Popup for image galleries
      $(".mfp-image").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        mainClass: "mfp-fade",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1], // Preload current and next images
        },
      });
    }

    // Update pagination based on the new items
    updatePagination(filteredItems.length);
  }

  // Function to update pagination
  function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = $(".pagination");
    pagination.empty(); // Clear existing pagination

    if (currentPage > 1) {
      pagination.append(
        `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a></li>`
      );
    }

    for (var i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage ? "active" : "";
      pagination.append(
        `<li class="page-item ${isActive}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`
      );
    }

    if (currentPage < totalPages) {
      pagination.append(
        `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage + 1}">Next</a></li>`
      );
    }

    // Handle pagination clicks to update the current page
    $(".page-link").on("click", function (e) {
      e.preventDefault();
      currentPage = parseInt($(this).attr("data-page"), 10); // Get the selected page
      displayPortfolioItems(); // Redraw items for the new page
    });
  }

  // Handle portfolio filter clicks to update the current filter
  $(".portfolioFilter a").on("click", function () {
    $(".portfolioFilter .active").removeClass("active");
    $(this).addClass("active");

    currentFilter = $(this).attr("data-filter"); // Update current filter
    currentPage = 1; // Reset to the first page
    displayPortfolioItems(); // Display the portfolio items based on the new filter

    return false;
  });

  // Remove the preloader when the window is fully loaded
  $(window).on("load", function () {
    console.log("Page loaded, removing preloader"); // Check if the preloader removal runs
    $("#status").fadeOut(); // Hide the preloader status
    $("#preloader").delay(350).fadeOut("slow"); // Hide the preloader itself
    $("body").delay(350).css({ overflow: "visible" }); // Make the body scrollable
  });

  // Display portfolio items when the document is ready
  $(document).ready(function () {
    console.log("Document is ready, displaying portfolio items"); // Debugging message
    displayPortfolioItems(); // Initial display
  });

  // Reinitialize Feather icons when the document is ready
  feather.replace(); // Ensure Feather icons are rendered
})(jQuery);
