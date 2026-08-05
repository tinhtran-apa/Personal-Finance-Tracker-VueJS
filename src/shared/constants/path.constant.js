export const PATH = {
  LOGIN: {
    href: "login",
    name: "login",
  },
  REGISTER: {
    href: "register",
    name: "register",
  },
  FORGOT_PASSWORD: {
    href: "forgot-password",
    name: "forgot-password",
  },
  DASHBOARD: {
    href: "dashboard",
    name: "dashboard",
    api: {
      fetch: "dashboards",
    },
  },
  CATEGORIES: {
    href: "categories",
    name: "categories",
    api: {
      fetch: "categories",
      create: "categories",
      update: "categories",
      delete: "categories",
    },
  },
  TRANSACTIONS: {
    href: "transactions",
    name: "transactions",
    api: {
      fetch: "transactions",
      create: "transactions",
      update: "transactions",
      delete: "transactions",
      summaryByCategory: "transactions/summary-by-category",
    },
  },
  AUTH: {
    api: {
      login: "auth/login",
      register: "auth/register",
      currentUser: "auth/current-user",
      logout: "auth/logout",
      refresh: "auth/refresh",
    },
  },
};
