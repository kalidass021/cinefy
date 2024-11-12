import { Schema, model } from 'mongoose';

const genreSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

const Genre = model('Genre', genreSchema);

export default Genre;
