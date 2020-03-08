import mongoose, { Document, Schema } from 'mongoose';

const validateInteger = require('mongoose-integer');

type PointOfInterest = Document & {
  name: string;
  coordinateX: number;
  coordinateY: number;
};

const PointOfInterestSchema = new Schema(
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
PointOfInterestSchema.plugin(validateInteger);

export default mongoose.model<PointOfInterest>('PointOfInterest', PointOfInterestSchema);
