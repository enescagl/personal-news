import type { Ref } from "vue";

export interface ListParams {
  page: Ref<number>;
  filters?: Ref | undefined;
  search?: Ref<string> | undefined;
}
