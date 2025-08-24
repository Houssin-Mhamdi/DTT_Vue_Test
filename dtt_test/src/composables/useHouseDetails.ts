import { type Ref, type ComputedRef, computed } from "vue";
import type { House } from "@/types/index";
/**
 *
 * @param houses 
 * @param houseId
 * @returns 
 */
export function useHouseDetails(
  houses: Ref<House[]>,
  houseId: Ref<string | number | undefined>
): {
  currentHouse: ComputedRef<House | undefined>;
  recommendedHouses: ComputedRef<House[]>;
} {
  //  find the house that matches the route's ID
  const currentHouse = computed<House | undefined>(() => {
    if (!houseId.value) return undefined; // Guard against missing ID
    return houses.value.find((h) => h.id == houseId.value);
  });

  // find houses for the "Recommended for you" section
  const recommendedHouses = computed<House[]>(() => {
    if (!houseId.value) return []; // Return empty array if no ID

    return houses.value
      .filter((h) => h.id != houseId.value) 
      .slice(0, 3);
  });

  return {
    currentHouse,
    recommendedHouses,
  };
}
