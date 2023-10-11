export type MapFilter = {
  id: string;
  label: string;
};

export const mapFilters: MapFilter[] = [
  {
    id: "stay",
    label: "Places to stay",
  },
  {
    id: "do",
    label: "Things to do",
  },
  {
    id: "couple",
    label: "Where the couple will be",
  },
];
