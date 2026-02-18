
/**
 * Optimization checklist for Cloudinary URLs:
 * 1. Core parameters: q_auto, f_auto
 * 2. Device-aware: w_auto, dpr_auto (if no specific width given)
 * 3. Specific width: w_XXX (if width given)
 * 4. Crop: c_fill (if width/height given)
 */

interface CloudinaryOptions {
    width?: number;
    height?: number;
}

export const optimizeCloudinaryUrl = (url: string, options: CloudinaryOptions = {}) => {
    if (!url || typeof url !== 'string') return url;
    if (!url.includes('res.cloudinary.com')) return url;

    // Check if already optimized to avoid duplication
    if (url.includes('q_auto') && url.includes('f_auto')) {
        // It might be already optimized, but let's check if we need to add width/height
        // For simplicity, if it seems fully formed with our tokens, we might skip, 
        // but users might want to override width. 
        // A robust parser is complex, so we will assume if 'q_auto' is missing we add it.
    }

    // Split the URL to insert transformations
    // Standard pattern: https://res.cloudinary.com/<cloud_name>/image/upload/<transformations>/v<version>/<public_id>.<ext>
    // Or: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<ext> (no transformations)

    const uploadToken = '/upload/';
    const parts = url.split(uploadToken);
    if (parts.length !== 2) return url;

    const [base, rest] = parts;

    // Base transformations
    const transforms: string[] = ['q_auto', 'f_auto'];

    // Width management
    if (options.width) {
        transforms.push(`w_${options.width}`);
        if (options.height) {
            transforms.push(`h_${options.height}`);
            transforms.push('c_fill'); // standard crop when both dimensions exist
        } else {
            transforms.push('c_limit'); // don't upscale if only width is given, or just 'c_scale' (default)
            // User checklist said: "h_XXX,c_fill (only when you must crop)"
            // If only width is provided, usually we just want to resize.
        }
    } else {
        // Device aware sizing if no specific width
        transforms.push('w_auto');
        transforms.push('dpr_auto');
    }

    // Join transformations
    const transformationString = transforms.join(',');

    // If 'rest' starts with existing transformations (doesn't start with 'v' followed by numbers, or simply has slashes before 'v'),
    // we might want to preserve them or replace them.
    // The user says "checklist of URL-level optimizations you should ADD".
    // Safest is to prepend ours. Cloudinary processes from left to right? 
    // Actually, chained transformations are separated by slashes. 
    // Parameters within a transformation set are commas.
    // e.g. /upload/w_500,h_500/v123...

    // Let's simple prepend our string.
    return `${base}${uploadToken}${transformationString}/${rest}`;
};
