(function ($) {
    "use strict";

    // Array containing the portfolio items
    var portfolioItems = [
        {
            
            category: "Chair",
            imgSrc: "images/index_images/_S4U4267.JPG",
            imgAlt: "Chair",
            overlayIcon: "camera",
        },
        {
            title: "Comfortable Sofa",
            category: "Sofa",
            imgSrc: "images/index_images/_S4U4257.JPG",
            imgAlt: "Sofa",
            overlayIcon: "camera",
        },
        {
            title: "Elegant Bed",
            category: "Bed",
            imgSrc: "images/index_images/_S4U4258.JPG",
            imgAlt: "Bed",
            overlayIcon: "camera",
        },
        {
            title: "Spacious Wardrobe",
            category: "Wardrobe",
            imgSrc: "images/index_images/_S4U4259.JPG",
            imgAlt: "Wardrobe",
            overlayIcon: "camera",
        },
        // Add more items as needed
    ];

    // Function to create a portfolio item
    function createPortfolioItem(item) {
        return `
            <div class="col-lg-4 col-md-6 mt-4 pt-2 ${item.category}">
                <div class="portfolio-box rounded shadow position-relative overflow-hidden">
                    <div class="portfolio-box-img position-relative overflow-hidden">
                        <img src="${item.imgSrc}" class="img-fluid" style="object-fit: contain; object-position: center;" alt="${item.imgAlt}">
                        <div class="overlay-work">
                            <div class="work-content text-center">
                                <a href="${item.imgSrc}" class="text-light work-icon bg-dark d-inline-block rounded-pill mfp-image">
                                <i
                                data-feather="camera" class="fea icon-sm image-icon"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to load portfolio items into the portfolio-content container
    function loadPortfolioItems() {
        var $portfolioContent = $("#portfolio-content");
        $portfolioContent.empty(); // Clear existing content

        // Loop through the portfolioItems array and append each item to the container
        portfolioItems.forEach(function (item) {
            var portfolioHTML = createPortfolioItem(item);
            $portfolioContent.append(portfolioHTML);
        });
    }

    // Load the portfolio items when the document is ready
    $(document).ready(function () {
        loadPortfolioItems();
    });

})(jQuery);
