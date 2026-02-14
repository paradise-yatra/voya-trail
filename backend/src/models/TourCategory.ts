import mongoose, { Document, Schema } from 'mongoose';

export interface ITourCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tourCategorySchema = new Schema<ITourCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const TourCategory = mongoose.model<ITourCategory>(
  'TourCategory',
  tourCategorySchema
);

export default TourCategory;





