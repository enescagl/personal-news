import debounce from "lodash.debounce";

const baseMixin = {
  data() {
    return {
      resourceName: "",
      resourceNamePlural: "",
    };
  },
};

const filterMixin = {
  data() {
    return {
      searchTerm: "",
      filters: {},
    };
  },
  watch: {
    searchTerm() {
      this.debouncedList();
    },
  },
  methods: {
    debouncedList: debounce(function () {
      this.list();
    }, 750),
    resetFilters() {
      this.searchTerm = "";
      this.filters = {};
    },
  },
};

const createMixin = {
  data() {
    return {
      item: {},
    };
  },
  methods: {
    async create(
      item = this.item,
      resource = this.resourceNamePlural,
      { axiosConfig } = {}
    ) {
      return await this.$axios.post(`/${resource}/`, item, {
        ...this.$axios.defaults,
        ...axiosConfig,
      });
    },
  },
};

const updateMixin = {
  data() {
    return {
      item: {},
    };
  },
  methods: {
    async update(
      item = this.item,
      lookupField = "id",
      { axiosConfig } = {},
      resource = this.resourceNamePlural,
      partial = false
    ) {
      if (!partial) {
        return await this.$axios.put(
          `/${resource}/${item[lookupField]}/`,
          item,
          {
            ...this.$axios.defaults,
            ...axiosConfig,
          }
        );
      } else {
        return await this.$axios.patch(
          `/${resource}/${item[lookupField]}/`,
          item,
          {
            ...this.$axios.defaults,
            ...axiosConfig,
          }
        );
      }
    },
  },
};

const listMixin = {
  data() {
    return {
      items: [],
      maxPageSize: 0,
      totalItems: 0,
      totalPages: 0,
    };
  },
  methods: {
    async list(
      { page, filters, search } = {
        page: 1,
        filters: this.filters,
        search: this.searchTerm,
      },
      resource = this.resourceNamePlural
    ) {
      let queryString = "";

      if (filters) {
        for (const filterKey in filters) {
          if (filters[filterKey]) {
            queryString += `&${filterKey}=${filters[filterKey]}`;
          }
        }
      }
      if (search) {
        if (search) {
          queryString += `&search=${search}`;
        }
      }

      const response = (
        await this.$axios.get(`/${resource}/?page=${page}${queryString}`)
      ).data;

      this.items = [...response.results];
      this.maxPageSize = response.max_page_size;
      this.totalItems = response.total;
      this.totalPages = response.total_pages;
    },
  },
};

const retrieveMixin = {
  data() {
    return {
      queryParam: "id",
      item: {},
    };
  },
  methods: {
    async retrieve(
      lookupValue = this.$route.params[this.queryParam],
      resource = this.resourceNamePlural
    ) {
      const response = (await this.$axios.get(`/${resource}/${lookupValue}/`))
        .data;

      this.item = { ...response };
    },
  },
  async mounted() {
    if (this.$route.params[this.queryParam]) {
      await this.retrieve();
    }
  },
};

const destroyMixin = {
  methods: {
    async destroy(lookupValue, resource = this.resourceNamePlural) {
      await this.$axios.delete(`/${resource}/${lookupValue}/`);
    },
  },
};

export {
  baseMixin,
  filterMixin,
  createMixin,
  updateMixin,
  listMixin,
  retrieveMixin,
  destroyMixin,
};
