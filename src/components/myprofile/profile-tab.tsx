"use client";

import { useState, useCallback } from "react";
import MyReviewCard, { Review } from "./my-review-card";
import MyWineCard, { Wine } from "./my-wine-card";
import "@/../public/images/placeholder1.png";
import instance from "@/api/api";
import InfiniteScroll from "../InfiniteScroll/infiniteScroll"; // InfiniteScroll 컴포넌트 임포트

export default function ProfileTab() {
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");
  const [reviews, setReviews] = useState<Review[]>([]); // 리뷰 데이터
  const [wines, setWines] = useState<Wine[]>([]); // 와인 데이터
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [reviewCursor, setReviewCursor] = useState<number | null>(null); // 리뷰 커서
  const [wineCursor, setWineCursor] = useState<number | null>(null); // 와인 커서
  const [hasMoreReviews, setHasMoreReviews] = useState(true); // 더 불러올 리뷰 데이터 여부
  const [hasMoreWines, setHasMoreWines] = useState(true); // 더 불러올 와인 데이터 여부
  const [reviewTotal, setReveiwTotal] = useState(0);
  const [wineTotal, setWineTotal] = useState(0);

  const initialLimit = 5; // 데이터 로딩 개수

  // 리뷰 데이터 가져오기
  const fetchReviews = useCallback(
    async (cursor: number | null) => {
      if (isLoading || !hasMoreReviews) return;
      try {
        setIsLoading(true);
        const response = await instance.get("/users/me/reviews", {
          params: { limit: initialLimit, cursor },
        });

        const { list, totalCount, nextCursor } = response.data;

        setReviews((prevReviews) => [
          ...prevReviews,
          ...list.filter(
            (newReview: Review) =>
              !prevReviews.some((review) => review.id === newReview.id),
          ),
        ]);
        setReveiwTotal(totalCount);
        setReviewCursor(nextCursor);
        setHasMoreReviews(!!nextCursor);
      } catch (error) {
        console.error("리뷰 데이터 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMoreReviews, initialLimit],
  );

  // 와인 데이터 가져오기
  const fetchWines = useCallback(
    async (cursor: number | null) => {
      if (isLoading || !hasMoreWines) return;
      try {
        setIsLoading(true);
        const response = await instance.get("/users/me/wines", {
          params: { limit: initialLimit, cursor },
        });

        const { list, totalCount, nextCursor } = response.data;

        setWines((prevWines) => [
          ...prevWines,
          ...list.filter(
            (newWine: Wine) =>
              !prevWines.some((wine) => wine.id === newWine.id),
          ),
        ]);
        setWineTotal(totalCount);
        setWineCursor(nextCursor);
        setHasMoreWines(!!nextCursor);
      } catch (error) {
        console.error("와인 데이터 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, hasMoreWines, initialLimit],
  );

  return (
    <div className="desktop:w-[80rem] desktop:h-[3.2rem] tablet:w-full mobile:w-full">
      <div className="flex justify-between items-center ">
        <div className="desktop:mb-[2.2rem] tablet:mb-0 mobile:mb-0">
          <button
            className={`
              desktop:w-[9.6rem] desktop:h-[3.2rem] desktop:text-[2rem] desktop:leading-[3.2rem]
              tablet:w-[9.6rem] tablet:h-[3.2rem] tablet:text-[2rem] tablet:leading-[3.2rem]
              mobile:w-auto mobile:h-[2.6rem] mobile:text-[1.8rem] mobile:leading-[2.6rem]
              font-semibold ${
                activeTab === "reviews" ? "text-gray-800" : "text-gray-500"
              }`}
            onClick={() => setActiveTab("reviews")}
          >
            내가 쓴 후기
          </button>
          <button
            className={`
              desktop:w-[13.1rem] desktop:h-[3.2rem] desktop:text-[2rem] desktop:leading-[3.2rem]
              tablet:w-[13.1rem] tablet:h-[3.2rem] tablet:text-[2rem] tablet:leading-[3.2rem]
              mobile:w-auto mobile:h-[2.6rem] mobile:text-[1.8rem] mobile:leading-[2.6rem]
              desktop:ml-[3.2rem] tablet:ml-[3.2rem] mobile:ml-[1.6rem]
              font-semibold ${
                activeTab === "wines" ? "text-gray-800" : "text-gray-500"
              }`}
            onClick={() => setActiveTab("wines")}
          >
            내가 등록한 와인
          </button>
        </div>
        <p className="desktop:mb-[2.2rem] tablet:mb-0 mobile:mb-[1.5rem] font-regular desktop:text-[1.4rem] desktop:leading-[2.4rem] tablet:text-[1.4rem] tablet:leading-[2.4rem] mobile:text-[1.2rem] mobile:leading-[1.8rem] text-right text-primary">
          {`총 ${activeTab === "reviews" ? reviewTotal : wineTotal}개`}
        </p>
      </div>

      {isLoading && <div>로딩 중...</div>}

      <div>
        {activeTab === "reviews" ? (
          <InfiniteScroll
            loadData={fetchReviews}
            isFetching={isLoading}
            hasMore={hasMoreReviews}
            cursor={reviewCursor}
          >
            <div className="mt-[2.2rem] space-y-[2rem]">
              {reviews.map((review) => (
                <MyReviewCard
                  key={review.id}
                  review={review}
                  onDelete={() => {
                    setReviews((prevReviews) =>
                      prevReviews.filter((r) => r.id !== review.id),
                    );
                    setReveiwTotal((prev) => prev - 1);
                  }}
                />
              ))}
            </div>
            {!hasMoreReviews && !isLoading && (
              <div className="mt-[3rem] text-center text-[1.8rem] text-[#CCCCCC]">
                더 이상 데이터가 없습니다.
              </div>
            )}
          </InfiniteScroll>
        ) : (
          <InfiniteScroll
            loadData={fetchWines}
            isFetching={isLoading}
            hasMore={hasMoreWines}
            cursor={wineCursor}
          >
            <div className="mt-[2.2rem] space-y-[2rem]">
              {wines.map((wine) => (
                <MyWineCard
                  key={wine.id}
                  wine={wine}
                  onDelete={() => {
                    setWines((prevWines) =>
                      prevWines.filter((w) => w.id !== wine.id),
                    );
                    setWineTotal((prev) => prev - 1);
                  }}
                />
              ))}
            </div>
            {!hasMoreWines && !isLoading && (
              <div className="mt-[3rem] text-center text-[1.8rem] text-[#CCCCCC]">
                더 이상 데이터가 없습니다.
              </div>
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
