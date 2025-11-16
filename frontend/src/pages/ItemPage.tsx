import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useModerationActions } from "../hooks/useModeration";
import { useAd } from "../hooks/useAds";
import { useAdNavigation } from "../hooks/useAdNavigation";
import { ItemPageHeader } from "../components/moderation/ItemPageHeader";
import { AdCharacteristics } from "../components/ads/AdCharacteristics";
import { SellerInfo } from "../components/ads/SellerInfo";
import { AdGallery } from "../components/ads/AdGallery";
import { ModerationHistory } from "../components/moderation/ModerationHistory";
import { ModerationActions } from "../components/moderation/ModerationActions";
import { AdNavigation } from "../components/moderation/AdNavigation";
import { RejectModal } from "../components/moderation/RejectModal";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { RequestChangesModal } from "../components/moderation/RequestChangesModal";

export const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestChangesModal, setShowRequestChangesModal] = useState(false);
  const { data: ad, isLoading, error } = useAd(id!);
  const filters = location.state?.filters || {};

  const navigation = useAdNavigation({
    currentAdId: Number(id!),
    filters,
  });

  const {
    approveAd,
    rejectAd,
    isRejecting,
    requestChangesAd,
    isRequestChanges,
  } = useModerationActions();

  const handleApprove = () => {
    if (!id) return;
    approveAd({ adId: id });
  };

  const handleReject = (reason: string, rejectComment?: string) => {
    if (!id) return;
    rejectAd({
      adId: id,
      reason,
      comment: rejectComment || undefined,
    });
    setShowRejectModal(false);
  };

  const handleRequestChanges = (reason: string, requestComment?: string) => {
    if (!id) return;
    requestChangesAd({
      adId: id,
      reason,
      comment: requestComment || undefined,
    });
    setShowRequestChangesModal(false);
  };

  if (isLoading) {
    return <LoadingState message="Загрузка объявления..." />;
  }

  if (error || !ad) {
    return (
      <ErrorState
        error={error}
        title="Объявление не найдено"
        actionLink="/list"
        actionText="Вернуться к списку"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <ItemPageHeader
          title={ad.title}
          previousAd={navigation?.previousAd}
          nextAd={navigation?.nextAd}
          currentPosition={navigation?.currentPosition}
          totalCount={navigation?.totalCount}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <AdCharacteristics characteristics={ad.characteristics} />
            <AdGallery images={ad.images} title={ad.title} />
            <ModerationHistory history={ad.moderationHistory} />
          </div>

          <div className="space-y-6">
            <SellerInfo seller={ad.seller} />
            <ModerationActions
              onApprove={handleApprove}
              onReject={() => setShowRejectModal(true)}
              onRequestChanges={() => setShowRequestChangesModal(true)}
              isRejecting={isRejecting}
            />
          </div>
        </div>

        <AdNavigation
          previousAd={navigation?.previousAd}
          nextAd={navigation?.nextAd}
          currentPosition={navigation?.currentPosition}
          totalCount={navigation?.totalCount}
        />
      </div>

      <RequestChangesModal
        isOpen={showRequestChangesModal}
        onClose={() => setShowRequestChangesModal(false)}
        onRequestChanges={handleRequestChanges}
        isSubmitting={isRequestChanges}
      />

      <RejectModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onReject={handleReject}
        isRejecting={isRejecting}
      />
    </div>
  );
};
