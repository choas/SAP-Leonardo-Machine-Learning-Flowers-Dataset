const fs = require("fs");

const labels = ["daisy", "dandelion", "roses", "sunflowers", "tulips"];

const P_TR = 80;
const P_TE = 10;
const P_VA = 10;

const PATH = "flowers";
const TRAIN_PATH = "training";
const TEST_PATH = "test";
const VALID_PATH = "validation";

_mkdir(PATH);
_mkdir(PATH + "/" + TRAIN_PATH);
_mkdir(PATH + "/" + TEST_PATH);
_mkdir(PATH + "/" + VALID_PATH);

Object.values(labels).forEach((label) => {
  _mkdir(PATH + "/" + TRAIN_PATH + "/" + label);
  _mkdir(PATH + "/" + TEST_PATH + "/" + label);
  _mkdir(PATH + "/" + VALID_PATH + "/" + label);
});

labels.forEach((flower) => {
  readFiles("./flower_photos/", flower);
});

function readFiles(dirname, label) {

  fs.readdir(dirname + "/" + label + "/", function (err, filenames) {
    if (err) {
      console.error(err);
      return;
    }
    var p_tr = P_TR, p_te = P_TE, p_va = P_VA;
    var c_tr = 0, c_te = 0, c_va = 0;
    var total = 0;
    filenames.forEach(function (filename) {
      var t = "";
      var r = Math.floor(Math.random() * (p_tr + p_te + p_va));
      if (r < p_tr) {
        t = TRAIN_PATH;
        c_tr += 1;
      } else if (r < p_tr + p_te) {
        t = TEST_PATH;
        c_te += 1;
      } else {
        t = VALID_PATH;
        c_va += 1;
      }

      let source = "flower_photos/" + label + "/" + filename;
      let dest = PATH + "/" + t + "/" + label + "/" + filename;

      fs.copyFile(source, dest, (err) => {
        if (err) {
          console.log(err);
        }
      });

      // adjust balance between trainig, test and validation data set
      total = (c_tr + c_te + c_va);
      if (total % 10 == 0) {
        p_tr += (P_TR - Math.round(c_tr / total * 100));
        p_te += (P_TE - Math.round(c_te / total * 100));
        p_va += (P_VA - Math.round(c_va / total * 100));
      }

    });
    console.log(label, Math.round(c_tr / total * 100), Math.round(c_te / total * 100), Math.round(c_va / total * 100));
  });
}

function _mkdir(path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw e;
    }
  }
}
