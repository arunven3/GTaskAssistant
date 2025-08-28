export const BaseTheme = {
  button: {
    base: "text-md rounded-lg px-4 py-2  transition-all duration-200",
    color: {},
  },
  textInput: {
    field: {
      input: {
        base: "block w-full rounded-md border shadow-sm sm:text-sm",
        colors: {},
      },
    },
  },
  textarea: {
    base: "block w-full rounded-md border shadow-sm sm:text-sm",
    colors: {},
  },
  checkbox: {
    base: "rounded focus:ring-2",
    color: {},
  },
  radio: {
    base: "focus:ring-2",
    color: {},
  },
  select: {
    field: {
      select: {
        base: "block w-full rounded-md border shadow-sm sm:text-sm",
        colors: {},
      },
    },
  },
  link: {
    base: "font-medium transition-colors duration-200",
    color: {},
  },
  admin: {
    page: { base: "pt-15 md:pl-64 h-screen" },
  },
  table: {
    root: {
      base: "w-full text-left text-sm",
    },
    head: {
      base: "bg-gray-50 text-lg uppercase text-bold",
      cell: {
        base: "px-6 py-3",
      },
    },
    body: {
      base: "divide-y divide-gray-200",
      row: {
        base: "bg-grey-800",
        hovered: "",
        cell: {
          base: "px-6 py-4 whitespace-nowrap",
        },
      },
    },
  },
};
