import DetailWineCard from "@/components/wines/detail/detail-wine-card";
import DetailReviewCard from "@/components/wines/detail/detail-review-card";
import ReviewProvider from "@/provider/usereviewmodals";
import ReviewProviderV2 from "@/provider/review-provider.context";

interface WineDetailPageProps {
  params: Promise<{
    wineid: string;
  }>;
}

export default async function WineDetailPage(props: WineDetailPageProps) {
  const params = await props.params;
  const { wineid } = await params;
  return (
    <ReviewProviderV2>
      <div className="flex flex-col mt-[2rem]">
        <DetailWineCard id={wineid} />
        <div className="mt-[6rem] mx-auto">
          <DetailReviewCard wineid={wineid} />
        </div>
      </div>
    </ReviewProviderV2>
  );
}
