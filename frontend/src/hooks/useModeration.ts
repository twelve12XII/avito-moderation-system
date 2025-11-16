import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adsService } from "../services/adsService";
import type {
  ModerationResponse,
  ModerationVariables,
  MutationError,
} from "../types/api";

export const useModerationActions = () => {
  const queryClient = useQueryClient();

  const commonOptions = {
    onSuccess: (data: ModerationResponse, variables: ModerationVariables) => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
      queryClient.invalidateQueries({ queryKey: ["ad", variables.adId] });
      queryClient.invalidateQueries({
        queryKey: ["moderation-history", variables.adId],
      });
    },
    onError: (error: MutationError, variables: ModerationVariables) => {
      console.error("Ошибка модерации:", variables.adId, error);
    },
  };

  const approve = useMutation({
    mutationFn: ({ adId, comment }: { adId: string; comment?: string }) =>
      adsService.approveAd(adId, comment),
    ...commonOptions,
  });

  const reject = useMutation({
    mutationFn: ({
      adId,
      reason,
      comment,
    }: {
      adId: string;
      reason: string;
      comment?: string;
    }) => adsService.rejectAd(adId, reason, comment),
    ...commonOptions,
  });

  const requestChangesAd = useMutation({
    mutationFn: ({
      adId,
      reason,
      comment,
    }: {
      adId: string;
      reason: string;
      comment?: string;
    }) => adsService.requestChanges(adId, reason, comment),
    ...commonOptions,
  });

  return {
    approveAd: approve.mutate,
    approveAsync: approve.mutateAsync,
    isApproving: approve.isPending,
    approveError: approve.error,

    rejectAd: reject.mutate,
    rejectAsync: reject.mutateAsync,
    isRejecting: reject.isPending,
    rejectError: reject.error,

    requestChangesAd: requestChangesAd.mutate,
    requestChangesAsync: requestChangesAd.mutateAsync,
    isRequestChanges: requestChangesAd.isPending,
    requestChangesError: requestChangesAd.error,
  };
};
