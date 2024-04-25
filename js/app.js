!(function ($) {
  "use strict";

  // Global variables for pagination and filtering
  var currentPage = 1;
  var itemsPerPage = 3; // Number of items to display per page
  var currentFilter = "*"; // Default filter (all items)

  // Portfolio items data source
  const portfolioItems = [
    { id: 1, category: "Chair", imageUrl: "images/index_images/_S4U4267.JPG" },
    { id: 2, category: "Sofa", imageUrl: "images/index_images/IMG-20220815-WA0010-removebg-preview.png" },
    { id: 3, category: "Chair", imageUrl: "images/index_images/PhotoRoom-20230804_130246.png" },
    { id: 4, category: "Chair", imageUrl: "images/index_images/PhotoRoom-20220918_145728-01.jpeg" },
    { id: 5, category: "Chair", imageUrl: "images/index_images/PhotoRoom-20221030_204925-01.jpeg" },
    { id: 6, category: "Chair", imageUrl: "images/index_images/PhotoRoom-20230225_131744.png" },
    { id: 7, category: "Chair", imageUrl: "images/index_images/PXL_20220827_120313726-01-removebg-preview.png" },
    { id: 8, category: "Chair", imageUrl: "images/index_images/119A1787.JPG" },
    { id: 9, category: "Chair", imageUrl: "images/index_images/119A2234.JPG" },
    { id: 10, category: "Chair", imageUrl: "images/index_images/PhotoRoom-20230425_164057-01.jpeg" },
  ];

  // Function to filter portfolio items based on the current filter
  function filterPortfolioItems() {
    if (currentFilter === "*") {
      return portfolioItems;
    }
    // Return only items matching the current category
    return portfolioItems.filter((item) => item.category === currentFilter);
  }

  // Function to display portfolio items with pagination
  function displayPortfolioItems() {
    const filteredItems = filterPortfolioItems(); // Get filtered items
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    const portfolioContainer = $("#portfolioContainer");
    portfolioContainer.empty();

    // Display only the filtered items for the current page
    filteredItems.slice(startIdx, endIdx).forEach((item) => {
      const portfolioItem = $(`
          <div class="col-lg-4 col-md-6 mt-4 pt-2 ${item.category}">
              <div class="portfolio-box rounded shadow position-relative overflow-hidden">
                  <div class="portfolio-box-img position-relative overflow-hidden">
                      <img src="${item.imageUrl}" class="img-fluid" style="object-fit: contain; object-position: center;" alt="${item.category}">
                      <div class="overlay-work">
                          <div class="work-content text-center">
                              <a href="${item.imageUrl}" class="text-light work-icon bg-dark d-inline-block rounded-pill mfp-image">
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

    // Initialize Magnific Popup for image galleries
    $(".mfp-image").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      mainClass: "mfp-fade",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1], // Load only current and next images
      },
    });

    // Update pagination with the total number of filtered items
    updatePagination(filteredItems.length);
  }

  // Function to update pagination based on total items and current page
  function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pagination = $(".pagination");
    pagination.empty(); // Clear existing pagination controls

    // Add "Previous" button if not on the first page
    if (currentPage > 1) {
      pagination.append(`<li class="page-item"><a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a></li>`);
    }

    // Add individual page numbers
    for (var i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage ? "active" : "";
      pagination.append(
        `<li class="page-item ${isActive}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`
      );
    }

    // Add "Next" button if not on the last page
    if (currentPage < totalPages) {
      pagination.append(
        `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage + 1}">Next</a></li>`
      );
    }

    // Handle pagination clicks
    $(".page-link").on("click", function (e) {
      e.preventDefault();
      currentPage = parseInt($(this).attr("data-page"), 10);
      displayPortfolioItems(); // Redraw the portfolio items for the new page
    });
  }

  // Handle portfolio filter clicks to update the current filter
  $(".portfolioFilter a").on("click", function () {
    $(".portfolioFilter .active").removeClass("active");
    $(this).addClass("active");

    currentFilter = $(this).attr("data-filter"); // Get the selected filter
    currentPage = 1; // Reset to the first page when changing filters
    displayPortfolioItems(); // Refresh the portfolio items with the new filter

    return false; // Prevent default click behavior
  });

  // Initial display of portfolio items
  displayPortfolioItems(); // Load the initial portfolio items

  // Loader
  $(window).on("load", function () {
    $("#status").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  });

  // Menu scroll effect
  $(window).scroll(function () {
    const scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $(".sticky").addClass("nav-sticky");
    } else {
      $(".sticky").removeClass("nav-sticky");
    }
  });

  $(".navbar-nav a, .mouse-down").on("click", function (event) {
    const $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1500,
        "easeInOutExpo"
      );
    event.preventDefault();
  });

  // Scrollspy for navbar
  $(".navbar-nav").scrollspy({ offset: 70 });

  // Initialize Feather icons
  feather.replace(); // This ensures Feather icons are properly initialized
})(jQuery);
