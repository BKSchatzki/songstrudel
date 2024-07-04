import {
  model,
  models,
  Schema,
} from 'mongoose';

const arrangementSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: [true, 'A title is required.'] },
    description: { type: String },
    instruments: {
      type: [String],
      required: [true, 'Instruments are required.'],
    },
    sections: [
      {
        name: { type: String, required: [true, 'A name is required.'] },
        notes: { type: String },
        rows: { type: [[Number]], required: [true, 'Cells are required.'] },
      },
    ],
    visibility: {
      type: String,
      enum: ['private', 'unlisted', 'visible'],
      default: 'unlisted',
    },
  },
  { timestamps: true }
);

const Arrangement = models.Arrangement || model('Arrangement', arrangementSchema);

export default Arrangement;
