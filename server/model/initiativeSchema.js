import mongoose from 'mongoose';

const initiativeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Initiative = mongoose.models.Initiative || mongoose.model('Initiative', initiativeSchema);

export default Initiative;
