const Book = require("../models/Book");
const Author = require("../models/Author");

exports.storeBook = async (req, res) => { //storing
  try {
    const { name, authorId, translatorId, category, subCategory, isbn, coverImage, additionalImages, description, publisher, publishDate, language, languageCode, firstPublisher, accessType, seriesNumber, Series, material } = req.body;
    // const isbnExists = await Book.findOne({ isbn });
    const isbnExists = await Book.exists({ isbn });
    if (isbnExists) {
      return res.status(400).json({
        message: "Cannot add another book with same ISBN",
      });
    }
    // const authorExists = await Author.findById(authorId);
    const authorExists = await Author.exists({ _id: authorId });
    if (!authorExists) {
      return res.status(400).json({
        message: "Author does not exist.",
      });
    }
    const response = await Book.create(req.body);
    if (response) {
      return res.status(200).json({
        message: "Book Created",
      });
    } else {
      return res.status(400).json({
        message: "Book Creation failed.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.toString(),
    });
  }
};