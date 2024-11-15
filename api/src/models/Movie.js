import { Schema, model } from 'mongoose';

const { ObjectId } = Schema;

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
        type: ObjectId,
        required: true,
        ref: 'User',
      },
  },
  { timestamps: true }
);

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    year: {
      type: Number,
      required: true,
    },
    genre: {
      type: ObjectId,
      ref: 'Genre',
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    // cast will be arr of objects
    cast: [
      {
        type: String,
      },
    ],
    reviews: [reviewSchema],
    numOfReviews: {
      type: Number,
      requrired: true,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


const Movie = model('Movie', movieSchema);

export default Movie;
