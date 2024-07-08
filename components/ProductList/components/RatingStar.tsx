import Image from "next/image";
import React from "react";

const STAR_SCORE = 20;
const MAX_SCORE = 100;
const MAX_STARS = 5;

const RatingStar = ({ ratingSummary }: { ratingSummary: number }) => {
  const ratingScore = ((ratingSummary * 5) / MAX_SCORE).toFixed(1);
  const fullStars = Math.floor(ratingSummary / STAR_SCORE);
  const halfStar = Number(ratingScore) % 1 >= 0.5 ? 1 : 0;
  ratingSummary % STAR_SCORE > 10
    ? 1
    : ratingSummary % STAR_SCORE > 0
    ? 0.5
    : 0;
  const emptyStars = MAX_STARS - fullStars - halfStar;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Image
        src={"/images/icons/star.svg"}
        unoptimized
        width={20}
        height={20}
        alt={""}
      />
    );
  }
  if (halfStar > 0) {
    stars.push(
      <Image
        src={"/images/icons/star-half.svg"}
        unoptimized
        width={20}
        height={20}
        alt={""}
      />
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Image
        src={"/images/icons/star-outline.svg"}
        unoptimized
        width={20}
        height={20}
        alt={""}
      />
    );
  }

  return (
    <div className="flex items-center min-h-5">
      {ratingSummary > 0 && (
        <>
          {stars}
          <span className="mr-2 ml-3 rounded bg-[#ffb71f] text-white px-2.5 py-0.5 text-xs font-semibold">
            {((ratingSummary * 5) / MAX_SCORE).toFixed(1)}
          </span>
        </>
      )}
    </div>
  );
};

export default RatingStar;
