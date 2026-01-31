import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IImageInfo {
  publicId: string;
  url: string;
  alt?: string;
}

export interface IItineraryStayDistances {
  airport: string;
  railway: string;
  cityHeart: string;
}

export interface IItineraryStay {
  name: string;
  image: string;
  stars: number;
  location: string;
  distances: IItineraryStayDistances;
  cuisine: string;
  facilities: string[];
}

export interface IItineraryDay {
  dayNumber: number;
  title: string;
  shortTitle?: string;
  description: string;
  experiences?: string[];
  stay?: IItineraryStay;
  images: string[];
}

export interface IFAQItem {
  question: string;
  answer: string;
}

export interface IRelatedTour {
  title: string;
  slug?: string;
  price: string;
  duration: string;
  image: string;
}

export interface ITourPackage extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  category: Types.ObjectId;
  duration: {
    nights: number;
    days: number;
  };
  startingPrice: number;
  priceCurrency?: string;
  priceUnit?: string;
  locations: string[];
  highlights: string[];
  overview: {
    title: string;
    description: string;
    durationLabel: string;
    groupSize: string;
    guide: string;
    languages: string;
  };
  amenityIds: Types.ObjectId[];
  itinerary: IItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  travelStyle?: string;
  bestTimeToVisit?: string;
  faq: IFAQItem[];
  notes: string[];
  images: {
    hero?: IImageInfo;
    gallery: IImageInfo[];
    mapImage?: IImageInfo;
  };
  relatedTours: IRelatedTour[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    canonicalUrl: string;
    ogImageUrl?: string;
  };
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const imageInfoSchema = new Schema<IImageInfo>(
  {
    publicId: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const itineraryStayDistancesSchema = new Schema<IItineraryStayDistances>(
  {
    airport: { type: String, required: true, trim: true },
    railway: { type: String, required: true, trim: true },
    cityHeart: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const itineraryStaySchema = new Schema<IItineraryStay>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    location: { type: String, required: true, trim: true },
    distances: {
      type: itineraryStayDistancesSchema,
      required: true,
    },
    cuisine: { type: String, required: true, trim: true },
    facilities: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const itineraryDaySchema = new Schema<IItineraryDay>(
  {
    dayNumber: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, trim: true },
    shortTitle: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    experiences: {
      type: [String],
      default: [],
    },
    stay: {
      type: itineraryStaySchema,
      required: false,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const faqItemSchema = new Schema<IFAQItem>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const relatedTourSchema = new Schema<IRelatedTour>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    price: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const tourPackageSchema = new Schema<ITourPackage>(
  {
    title: {
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
    subtitle: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'TourCategory',
      required: true,
    },
    duration: {
      nights: { type: Number, required: true, min: 0 },
      days: { type: Number, required: true, min: 1 },
    },
    startingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    priceCurrency: {
      type: String,
      default: 'INR',
    },
    priceUnit: {
      type: String,
      default: 'per person',
    },
    locations: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    overview: {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      durationLabel: { type: String, required: true, trim: true },
      groupSize: { type: String, required: true, trim: true },
      guide: { type: String, required: true, trim: true },
      languages: { type: String, required: true, trim: true },
    },
    amenityIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Amenity',
      },
    ],
    itinerary: {
      type: [itineraryDaySchema],
      validate: [
        (val: IItineraryDay[]) => val.length > 0,
        'At least one itinerary day is required',
      ],
    },
    inclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    travelStyle: {
      type: String,
      trim: true,
    },
    bestTimeToVisit: {
      type: String,
      trim: true,
    },
    faq: {
      type: [faqItemSchema],
      default: [],
    },
    notes: {
      type: [String],
      default: [],
    },
    images: {
      hero: {
        type: imageInfoSchema,
        required: false,
      },
      gallery: {
        type: [imageInfoSchema],
        default: [],
      },
      mapImage: {
        type: imageInfoSchema,
        required: false,
      },
    },
    relatedTours: {
      type: [relatedTourSchema],
      default: [],
    },
    seo: {
      metaTitle: { type: String, required: true, trim: true },
      metaDescription: { type: String, required: true, trim: true },
      metaKeywords: {
        type: [String],
        default: [],
      },
      canonicalUrl: { type: String, required: true, trim: true },
      ogImageUrl: {
        type: String,
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

const TourPackage = mongoose.model<ITourPackage>(
  'TourPackage',
  tourPackageSchema
);

export default TourPackage;


