const baseMixin = {
  data() {
    return {
      resourceName: "",
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
    searchTerm: function () {
      this.list();
    },
  },
  methods: {
    resetFilters() {
      this.searchTerm = "";
      this.filters = {};
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
      resource = this.resourceName
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
          queryString += `search=${search}`;
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
      resource = this.resourceName
    ) {
      const response = (await this.$axios.get(`/${resource}/${lookupValue}`))
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
    async destroy(lookupValue, resource = this.resourceName) {
      await this.$axios.delete(`/${resource}/${lookupValue}`);
    },
  },
};

export { baseMixin, filterMixin, listMixin, retrieveMixin, destroyMixin };
