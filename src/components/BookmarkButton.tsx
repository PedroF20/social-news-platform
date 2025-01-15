import React from 'react';
import {
  BookmarkIcon,
  BookmarkIcon as BookmarkIconSolid,
} from '@heroicons/react/24/solid';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  toggleBookmark: () => void;
  size?: number; // Optional prop for size
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isBookmarked,
  toggleBookmark,
  size = 6, // Tailwind size classes
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent triggering parent click
        toggleBookmark();
      }}
      className="p-2 rounded-full hover:bg-gray-200 focus:outline-none transition"
      aria-label={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
    >
      {isBookmarked ? (
        <BookmarkIconSolid
          className={`h-${size} w-${size} text-yellow-500`}
          aria-hidden="true"
        />
      ) : (
        <BookmarkIcon
          className={`h-${size} w-${size} text-gray-500`}
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default BookmarkButton;
