!(function ($) {
    "use strict";
  
    // Global variables for pagination and filtering
    var currentPage = 1;
    var itemsPerPage = 3; // Change as needed
    var currentFilter = "*"; // Default is "All"
  
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
      var scroll = $(window).scrollTop();
      if (scroll >= 50) {
        $(".sticky").addClass("nav-sticky");
      } else {
        $(".sticky").removeClass("nav-sticky");
      }
    });
  
    $(".navbar-nav a, .mouse-down").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 0,
          },
          1500,
          "easeInOutExpo"
        );
      event.preventDefault();
    });
  
    // Scrollspy
    $(".navbar-nav").scrollspy({ offset: 70 });
  
    // Initialize feather icons
    feather.replace();
  
    // Portfolio items data source
    const portfolioItems = [
      { id: 1, category: "Chair", imageUrl: "images/index_images/_S4U4267.JPG" },
      {
        id: 2,
        category: "Sofa",
        imageUrl: "images/index_images/IMG-20220815-WA0010-removebg-preview.png",
      },
      {
        id: 3,
        category: "Chair",
        imageUrl: "images/index_images/PhotoRoom-20230804_130246.png",
      },
      {
        id: 4,
        category: "Chair",
        imageUrl: "images/index_images/PhotoRoom-20220918_145728-01.jpeg",
      },
      {
        id: 5,
        category: "Chair",
        imageUrl: "images/index_images/PhotoRoom-20221030_204925-01.jpeg",
      },
      {
        id: 6,
        category: "Chair",
        imageUrl: "images/index_images/PhotoRoom-20230225_131744.png",
      },
      {
        id: 7,
        category: "Chair",
        imageUrl:
          "images/index_images/PXL_20220827_120313726-01-removebg-preview.png",
      },
      { id: 8, category: "Chair", imageUrl: "images/index_images/119A1787.JPG" },
      { id: 9, category: "Chair", imageUrl: "images/index_images/119A2234.JPG" },
      {
        id: 10,
        category: "Chair",
        imageUrl: "images/index_images/PhotoRoom-20230425_164057-01.jpeg",
      },
    ];
  
    // Filter portfolio items based on the current filter
    function filterPortfolioItems() {
      if (currentFilter === "*") {
        return portfolioItems;
      }
      // Return only items matching the current category
      return portfolioItems.filter(function (item) {
        return item.category === currentFilter;
      });
    }
  
    // Display portfolio items with pagination and filtering
    function displayPortfolioItems() {
      var filteredItems = filterPortfolioItems(); // Get the filtered items
      var startIdx = (currentPage - 1) * itemsPerPage;
      var endIdx = startIdx + itemsPerPage;
  
      var portfolioContainer = $("#portfolioContainer");
      portfolioContainer.empty();
  
      // Display only the filtered items for the current page
      filteredItems.slice(startIdx, endIdx).forEach(function (item) {
        var portfolioItem = $(`
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
  
      // Initialize Magnific Popup
      $(".mfp-image").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        mainClass: "mfp-fade",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1],
        },
      });
  
      // Update pagination with the length of filtered items
      updatePagination(filteredItems.length);
    }
  
    // Update pagination based on the total items and current page
    function updatePagination(totalItems) {
      var totalPages = Math.ceil(totalItems / itemsPerPage);
  
      var pagination = $(".pagination");
      pagination.empty();
  
      // Add "Previous" button if not on the first page
      if (currentPage > 1) {
        pagination.append(
          `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a></li>`
        );
      }
  
      // Add page numbers for all pages
      for (var i = 1; i <= totalPages; i++) {
        var isActive = i === currentPage ? "active" : "";
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
  
      // Handle pagination clicks to update current page and display new items
      $(".page-link").on("click", function (e) {
        e.preventDefault();
        currentPage = parseInt($(this).attr("data-page"), 10);
        displayPortfolioItems(); // Redraw the portfolio items for the new page
      });
    }
  
    // Handle portfolio filter clicks to update the current filter and display new items
    $(".portfolioFilter a").on("click", function () {
      $(".portfolioFilter .active").removeClass("active");
      $(this).addClass("active");
  
      currentFilter = $(this).attr("data-filter");
      currentPage = 1; // Reset to the first page when changing filters
      displayPortfolioItems(); // Refresh the portfolio items with the new filter
  
      return false; // Prevent default click behavior
    });
  
    // Initial display of portfolio items
    displayPortfolioItems(); // Load the initial portfolio items
  })(jQuery);
  