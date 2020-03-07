import mongoose, { Document, Schema } from 'mongoose';

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
      required: true
    },
    coordinateY: {
      type: Number,
      min: 0,
      required: true
    }
  },
  {
    timestamps: true
  },
);

export default mongoose.model<InterestPoint>('InterestPoint', InterestPointSchema);
