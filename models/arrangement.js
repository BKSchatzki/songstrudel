import { Schema, model, models } from "mongoose";

const arrangementSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: [true, "A title is required."] },
    description: {
      type: String,
      required: [true, "A description is required."],
    },
    instruments: {
      type: [String],
      required: [true, "Instruments are required."],
    },
    sections: [
      {
        name: { type: String, required: [true, "A name is required."] },
        notes: { type: String, required: [true, "Notes are required."] },
        rows: { type: [[Number]], required: [true, "Rows are required."] },
      },
    ],
  },
  { timestamps: true },
);

const Arrangement =
  models.Arrangement || model("Arrangement", arrangementSchema);

export default Arrangement;
