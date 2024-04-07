const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Define the subcategory schema
const subcategorySchema = new Schema({
  subcategory: { type: String }
});

// Define the category schema
const categorySchema = new Schema({
  type: { type: String },
  subcategories: [subcategorySchema] // Array of subcategory objects
});

const bookSchema = new Schema({
  name: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "author",
  },
  translatedBy: String,
  publisher: String,
  printYear: String,
  first_publisher: String,
  first_printYear: String,
  ISBN: String,
  series: String,
  access_type: String,
  description: String,
  physicalBookStores: Array,

  categories: [categorySchema], // Array of category objects

  previousSeries: {
    type: Boolean,
    default: false,
  },
  viewInLibrary: {
    type: Boolean,
    default: true,
  },
  viewFrequency: {
    type: Number,
    default: 0,
  },
  previousSeriesLinks: Array,
  libraries: [
    {
      type: Schema.Types.ObjectId,
      ref: "library",
    },
  ],
  bookImages: Array, //first five pages of the book,back cover,front cover
  backCover: String,
  frontCover: String,
  bookUrl: String,
  publisher_pdf: String,
  pdf_published_year: String,
  publisher_epub: String,
  epub_published_year: String,

  chapter_number_epub: Array,
  chapter_name_epub: Array,
  fileListEpubChapter: Array,

  chapterNumbersTxt: Array,
  chapterNamesTxt: Array,
  fileListTxtChapter: Array,

  publisher_text: String,

  format_type: String,
  audio_published_year: String,
  total_duration: String,

  chapterAudioMale: Array,
  chapterAudioFemale: Array,
  chapterAudioDramatic: Array,

  text_published_year: String,
  textBook: String,
  epubBook: String,
  bookMp3UrlFemale: String,
  bookMp3UrlMale: String,
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("book", bookSchema);
