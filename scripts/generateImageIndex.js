const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "..", "images");
const outputDir = path.join(__dirname, "..", "js"); // The correct path for the output
const outputFilePath = path.join(outputDir, "imageIndex.json");

// Ensure the target directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const categories = fs
  .readdirSync(imagesDir)
  .filter((f) => fs.statSync(path.join(imagesDir, f)).isDirectory());

let imageIndex = [];

categories.forEach((category) => {
  const categoryPath = path.join(imagesDir, category);
  const images = fs
    .readdirSync(categoryPath)
    .filter((f) => /\.(jpg|jpeg|png|gif)$/.test(f));

  images.forEach((image) => {
    imageIndex.push({
      category,
      imageUrl: `images/${category}/${image}`,
    });
  });
});

fs.writeFileSync(outputFilePath, JSON.stringify(imageIndex, null, 2), "utf-8");
