import { api } from "./api";
import type { Stats, StatsPeriod, CategoryStats } from "../types/stats";

export const statsService = {
  getStats: async (period: StatsPeriod = "week"): Promise<Stats> => {
    const [summary, activity, decisions, categoriesData] = await Promise.all([
      api.get(`/stats/summary?period=${period}`).then((res) => res.data),
      api.get(`/stats/chart/activity?period=${period}`).then((res) => res.data),
      api
        .get(`/stats/chart/decisions?period=${period}`)
        .then((res) => res.data),
      api
        .get(`/stats/chart/categories?period=${period}`)
        .then((res) => res.data),
    ]);

    const categories: CategoryStats[] = Object.entries(categoriesData).map(
      ([name, count]) => ({
        name,
        count: count as number,
      })
    );

    return {
      summary,
      activity,
      decisions,
      categories,
    };
  },
};
