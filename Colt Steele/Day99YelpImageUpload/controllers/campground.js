const Campground = require("../models/campground");

const { cloudinary } = require("../cloudinary/index.js");
const campground = require("../models/campground");

// Rebder campground index
module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

// Render new camp form
module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

// Add new camp to campground
module.exports.addCamp = async (req, res) => {
  const camp = new Campground(req.body.campground);
  camp.author = req.user._id;
  camp.imageUrl = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  await camp.save();
  req.flash("success", "Successfully made a new campground");
  res.redirect("/campgrounds");
};

// Render edit form for campsite
module.exports.renderEditForm = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
};

// Edit campsite fully
module.exports.updateCamp = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");

  if (!campground) {
    req.flash("error", "Cannot find the campground");
    res.redirect("/");
  }
  res.render("campgrounds/show", { campground });
};

// Delete campsite
module.exports.deleteCamp = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  for (let file of campground.imageUrl) {
    await cloudinary.uploader.destroy(file.filename);
  }
  await Campground.findByIdAndDelete(id);
  req.flash("error", "Successfully deleted a campground");
  res.redirect("/campgrounds");
};

// Minor update to camp
module.exports.smUpdateCamp = async (req, res) => {
  const { deleteImages } = req.body;
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  await campground.imageUrl.push(...imgs);
  if (deleteImages.length > 0) {
    console.log(deleteImages);
    console.log(campground);
    for (let filename of deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { imageUrl: { filename: { $in: deleteImages } } },
    });
    console.log(campground);
  }
  await campground.save();
  req.flash("success", "Successfully updated the campground");
  res.redirect(`/campgrounds/${id}`);
};
