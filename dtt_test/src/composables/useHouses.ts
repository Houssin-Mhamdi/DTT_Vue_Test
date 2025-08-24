import { ref, onMounted, type Ref } from "vue";
import { getHouses } from "@/services/houseService.ts";
import type { House as ApiHouse, ComponentHouse } from "@/types";

interface UseHousesReturn {
  houses: Ref<ComponentHouse[]>;
  isLoading: Ref<boolean>;
  errorMessage: Ref<string>;
  fetchHouses: () => Promise<void>;
}
const houses: Ref<ComponentHouse[]> = ref([]);
const isLoading: Ref<boolean> = ref(true);
const errorMessage: Ref<string> = ref("");
export function useHouses(): UseHousesReturn {
  const fetchHouses = async () => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const response = await getHouses();
      houses.value = response.data.map(
        (house: ApiHouse): ComponentHouse => ({
          id: house.id,
          image: house.image,
          address: `${house.location.street} ${house.location.houseNumber}${
            house.location.houseNumberAddition || ""
          }`,
          price: house.price,
          location: `${house.location.zip} ${house.location.city}`,
          bedrooms: house.rooms.bedrooms,
          bathrooms: house.rooms.bathrooms,
          size: house.size,
          madeByMe: house.madeByMe,
          description: house.description,
        })
      );
    } catch (error) {
      console.error("Failed to fetch houses:", error);
      errorMessage.value =
        "Oops! Something went wrong while fetching the listings.";
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchHouses);

  return {
    houses,
    isLoading,
    errorMessage,
    fetchHouses,
  };
}
