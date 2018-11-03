# SAP Leonardo Machine Learning Flowers Dataset

Download the dataset from [How to Retrain an Image Classifier for New Categories](https://www.tensorflow.org/hub/tutorials/image_retraining).

Extract it into the project folder:

```sh
tar xf flower_photos.tgz
```

... and run:

```sh
node create_trainingsset.js
```

This creates a flowers folder with the following structure and copies the flowers into the training, test and validation folder.

```text
flowers
├── test
│   ├── daisy
│   ├── dandelion
│   ├── roses
│   ├── sunflowers
│   └── tulips
├── training
│   ├── daisy
│   ├── dandelion
│   ├── roses
│   ├── sunflowers
│   └── tulips
└── validation
    ├── daisy
    ├── dandelion
    ├── roses
    ├── sunflowers
    └── tulips
```