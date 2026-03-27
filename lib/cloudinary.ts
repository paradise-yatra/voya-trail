
interface CloudinaryOptions {
    width?: number;
    height?: number;
    crop?: 'fill' | 'limit' | 'fit' | 'scale' | 'pad';
    gravity?: 'auto' | 'center' | 'face' | 'faces';
    quality?: 'auto' | 'best' | 'good' | 'eco' | 'low';
    responsive?: boolean;
    responsiveStep?: number;
    fallbackWidth?: number;
    dpr?: 'auto' | number;
}

const isTransformationSegment = (segment: string) => {
    return segment.includes(',') || segment.startsWith('t_') || segment.startsWith('$');
};

const splitTransformationSegments = (rest: string) => {
    const segments = rest.split('/').filter(Boolean);
    const transformationSegments: string[] = [];
    let assetStartIndex = 0;

    for (let index = 0; index < segments.length; index += 1) {
        const segment = segments[index];

        if (/^v\d+$/.test(segment)) {
            assetStartIndex = index;
            return {
                transformationSegments,
                assetSegments: segments.slice(assetStartIndex),
            };
        }

        if (isTransformationSegment(segment)) {
            transformationSegments.push(segment);
            continue;
        }

        assetStartIndex = index;
        return {
            transformationSegments,
            assetSegments: segments.slice(assetStartIndex),
        };
    }

    return {
        transformationSegments,
        assetSegments: [],
    };
};

const getQualityValue = (options: CloudinaryOptions) => {
    if (options.quality && options.quality !== 'auto') {
        return `q_auto:${options.quality}`;
    }

    if ((options.width || 0) <= 500) {
        return 'q_auto:eco';
    }

    return 'q_auto:good';
};

const buildOptimizationSegment = (options: CloudinaryOptions) => {
    const transforms: string[] = [getQualityValue(options), 'f_auto', `dpr_${options.dpr ?? 'auto'}`];

    if (options.width) {
        transforms.push(`w_${options.width}`);

        if (options.height) {
            const crop = options.crop || 'fill';
            transforms.push(`h_${options.height}`, `c_${crop}`);

            if (crop === 'fill') {
                transforms.push(`g_${options.gravity || 'auto'}`);
            }
        } else {
            transforms.push(`c_${options.crop || 'limit'}`);

            if (options.gravity && options.crop === 'fill') {
                transforms.push(`g_${options.gravity}`);
            }
        }
    } else if (options.responsive !== false) {
        const responsiveStep = options.responsiveStep || 100;
        const fallbackWidth = options.fallbackWidth || 1200;
        transforms.push(`w_auto:${responsiveStep}:${fallbackWidth}`, 'c_limit');
    }

    return transforms.join(',');
};

export const optimizeCloudinaryUrl = (url: string, options: CloudinaryOptions = {}) => {
    if (!url || typeof url !== 'string') return url;
    if (!url.includes('res.cloudinary.com')) return url;

    const uploadToken = '/upload/';
    const parts = url.split(uploadToken);
    if (parts.length !== 2) return url;

    const [base, rest] = parts;
    const { transformationSegments, assetSegments } = splitTransformationSegments(rest);
    const optimizationSegment = buildOptimizationSegment(options);
    const optimizedSegments = [...transformationSegments, optimizationSegment, ...assetSegments].filter(Boolean);

    return `${base}${uploadToken}${optimizedSegments.join('/')}`;
};
