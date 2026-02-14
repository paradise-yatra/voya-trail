import mongoose, { Document, Schema } from 'mongoose';

export interface IAmenity extends Document {
  label: string;
  iconKey?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const amenitySchema = new Schema<IAmenity>(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    iconKey: {
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

const Amenity = mongoose.model<IAmenity>('Amenity', amenitySchema);

export default Amenity;





