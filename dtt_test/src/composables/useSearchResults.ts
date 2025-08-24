
import { computed, type Ref, type ComputedRef } from "vue";

/**
 * @param searchQuery
 * @param filteredList
 */
export function useSearchResults<T>(
  searchQuery: Ref<string> | ComputedRef<string>,
  filteredList: Ref<T[]> | ComputedRef<T[]>
) {
  const resultsCountMessage = computed(() => {
    if (!searchQuery.value) {
      return "";
    }

    const count = filteredList.value.length;

    if (count === 1) {
      return "1 result found";
    }
    return `${count} results found`;
  });

  return {
    resultsCountMessage,
  };
}
