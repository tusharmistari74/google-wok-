
import React from 'react';
import { Icon } from './Icon';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Icon key={`full-${i}`} name="star" className="w-4 h-4 text-yellow-400 fill-current" />
      ))}
      {halfStar && (
         <Icon key="half" name="star" className="w-4 h-4 text-yellow-400 fill-current" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon key={`empty-${i}`} name="star" className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

export default Rating;
