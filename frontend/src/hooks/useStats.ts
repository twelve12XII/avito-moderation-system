import { useQuery } from "@tanstack/react-query";
import { statsService } from "../services/statsService";
import type { StatsPeriod } from "../types/stats";

export const useStats = (period: StatsPeriod = "week") => {
  return useQuery({
    queryKey: ["stats", period],
    queryFn: () => statsService.getStats(period),
  });
};
