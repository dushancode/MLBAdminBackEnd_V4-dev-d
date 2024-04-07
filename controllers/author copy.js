const Author = require("../models/Author");

exports.createAuthor = async (req, res) => {
  try {
    let profileImage;
    if (req.awsImages) {
      profileImage = req.awsImages?.[0];
    }

    Author.create(
      profileImage ? { ...req.body, profileImage } : req.body,
      (err, doc) => {
        if (err)
          return res.status(400).json({
            message: err,
          });
        return res.status(200).json({
          message: "Author Added Successfully",
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: err.toString(),
    });
  }
};

exports.createAuthers= async (req,res)=>{

  try {
    const authers = req.body;

    if(!authers){
      res.status(500).json("Authers are unavailable");
    }
    authers?.map((auther)=>{
      Author.create(
        auther,
        (err, doc) => {
          if (err)
            return res.status(400).json({
              message: err,
            });
        }
      );
    })
    return res.status(200).json({
      message: "Authors are Added Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: err.toString(),
    });
  }
 
}

exports.getAll = async (req, res) => {
  try {
    Author.find({})
      .populate("books")
      .then((authors) => {
        res.status(200).json(authors);
      });
  } catch (err) {
    res.status(500).json({
      message: err.toString(),
    });
  }
};

exports.searchAuthors = async (req, res) => {
  try {
    Author.find({ name: { $regex: req.body.name, $options: "i" } })
      .populate("books")
      .then((authors) => {
        res.status(200).json(authors);
      });
  } catch (err) {
    res.status(500).json({
      message: err.toString(),
    });
  }
};
// exports.getAllByLibrary = async (req, res) => {
//   try {
//     Author.find({
//       libraries: { $in: [req.params.id] },
//       viewInLibrary: true,
//     }).then((books) => {
//       res.status(200).json(books);
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.toString(),
//     });
//   }
// };

exports.getAuthor = async (req, res) => {
  try {
    Author.findById(req.params.id)
      .populate("books")
      .then((author) => {
        res.status(200).json(author);
      });
  } catch (err) {
    res.status(500).json({
      message: err.toString(),
    });
  }
};

exports.editAuthor = async (req, res) => {
  try {
    const { id } = req.body;

    let profileImage;
    if (req.awsImages) {
      profileImage = req.awsImages?.[0];
    }

    Author.findByIdAndUpdate(
      id,
      profileImage ? { ...req.body, profileImage } : req.body,
      { new: true },
      (err, doc) => {
        res.status(200).json({
          message: "Author Updated.",
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: err.toString(),
    });
  }
};
