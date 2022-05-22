import { debounce } from "lodash";
import { onMounted, reactive, ref, watch } from "vue";
import type { Ref } from "vue";
import { $axios } from "@/plugins/axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useRoute } from "vue-router";

export interface ListParams {
  page: Ref<number>;
  filters?: Ref | undefined;
  search?: Ref<string> | undefined;
}

export function useItemState() {
  const item = ref({});
  return {
    item,
  };
}

// export function usePagination() {}

export function useFilterOnList(
  list: (params: ListParams) => Promise<AxiosResponse>
) {
  const searchTerm = ref("");
  const filters = ref({});
  const page = ref(1);

  function debouncedList() {
    return debounce(function () {
      return list({ page: page, filters: filters, search: searchTerm });
    }, 750);
  }

  function resetFilters() {
    searchTerm.value = "";
    filters.value = {};
  }

  watch(searchTerm, () => {
    debouncedList();
  });

  return {
    searchTerm,
    filters,
    resetFilters,
  };
}

export function useCreate(resource: string) {
  async function create(item: Ref, axiosConfig?: AxiosRequestConfig) {
    return await $axios.post(`/${resource}/`, item.value, {
      ...axiosConfig,
    });
  }

  return {
    create,
  };
}

export function useUpdate(resource: string) {
  async function update(
    item: Ref,
    lookupField = "id",
    axiosConfig?: AxiosRequestConfig,
    partial = false
  ) {
    if (!partial) {
      return await $axios.put(
        `/${resource}/${item.value[lookupField]}/`,
        item,
        {
          ...axiosConfig,
        }
      );
    } else {
      return await $axios.patch(
        `/${resource}/${item.value[lookupField]}/`,
        item,
        {
          ...axiosConfig,
        }
      );
    }
  }

  return {
    update,
  };
}

export function useList(resource: string) {
  const items = ref<any[]>([]);
  const maxPageSize = ref(0);
  const totalItems = ref(0);
  const totalPages = ref(0);

  const defaultRefs = {
    filters: ref({}),
    search: ref(""),
  };

  async function list({
    page = ref(1),
    filters = defaultRefs.filters,
    search = defaultRefs.search,
  }: ListParams) {
    let queryString = "";

    if (filters?.value) {
      for (const filterKey in filters.value) {
        if (filters.value[filterKey]) {
          queryString += `&${filterKey}=${filters.value[filterKey]}`;
        }
      }
    }

    queryString += search?.value ? `&search=${search?.value}` : "";

    const response = await $axios.get(
      `/${resource}/?page=${page.value}${queryString}`
    );
    items.value = [...response.data.results];
    maxPageSize.value = response.data.max_page_size;
    totalItems.value = response.data.total;
    totalPages.value = response.data.total_pages;
    return response;
  }

  return {
    list,
    items,
    maxPageSize,
    totalItems,
    totalPages,
  };
}

export function useRetrieve({
  resource,
  queryParam = "id",
  itemRef,
}: {
  resource: string;
  queryParam?: string;
  itemRef: Ref;
}) {
  const route = useRoute();

  async function retrieve(
    item = itemRef as Ref,
    lookupValue = route.params[queryParam]
  ) {
    const response = await $axios.get(`/${resource}/${lookupValue}/`);
    item.value = { ...response.data };
    return response;
  }

  onMounted(async () => {
    if (route.params[queryParam]) {
      await retrieve();
    }
  });

  return {
    retrieve,
  };
}

export function useDestroy(resource: string) {
  async function destroy(lookupValue: string) {
    return await $axios.delete(`/${resource}/${lookupValue}/`);
  }

  return {
    destroy,
  };
}
