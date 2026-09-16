import * as React from 'react';
const Image = React.forwardRef(({ fittingType, originWidth, originHeight, focalPointX, focalPointY, quality, ...props }, ref) => <img ref={ref} loading="lazy" {...props} />);
Image.displayName = 'Image';
export { Image };
