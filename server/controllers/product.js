const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    // .populate('category')
    // .populate('subCategory')
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(products);
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Product deletion failed");
  }
};

exports.read = async (req,res) => {
  const product = await Product.findOne({slug:req.params.slug})
  .populate('category')
  .populate('subCategory')
  .exec()
  res.json(product)
}
