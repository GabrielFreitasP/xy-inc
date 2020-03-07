import mongoose, { Document, Schema } from 'mongoose';

const validateInteger = require('mongoose-integer');

type InterestPoint = Document & {
  name: string;
  coordinateX: number;
  coordinateY: number;
};

const InterestPointSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    coordinateX: {
      type: Number,
      min: 0,
      required: true,
      integer: true
    },
    coordinateY: {
      type: Number,
      min: 0,
      required: true,
      integer: true
    }
  },
  {
    timestamps: true
  }
);
InterestPointSchema.plugin(validateInteger);

export default mongoose.model<InterestPoint>('InterestPoint', InterestPointSchema);
