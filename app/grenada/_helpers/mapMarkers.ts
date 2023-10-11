import calculateDistance, { Coordinates } from "./calculateDistance";

export type MapMarker = {
  id: number;
  svg?: string;
  png?: number;
  title: string;
  position: Coordinates;
  website: string;
  email: string;
  mapUrl: string;
  filterId: string;
  distanceFromVenue: number;
  distanceFromCouple: number;
};

// Coyaba Beach Resort position
const coyabaPosition: Coordinates = {
  lat: 12.023614883422852,
  lng: -61.761207580566406,
};

// True blue bay position
const venuePosition: Coordinates = {
  lat: 12.000312492233384,
  lng: -61.768568271488,
};

export const mapMarkers: MapMarker[] = [
  // Places to stay
  {
    id: 1,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#0f8eae}</style><path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"/></svg>`,
    title: "Coyaba Beach Resort",
    position: coyabaPosition,
    website: "https://www.coyaba.com",
    email: "reservations@coyaba.com",
    mapUrl: "",
    filterId: "stay",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 2,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#0fa319}</style><path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"/></svg>`,
    title: "Radisson Grenada Beach Resort",
    position: {
      lat: 12.025479316711426,
      lng: -61.7571907043457,
    },
    website:
      "https://www.choicehotels.com/en-ca/grenada/st-georges/radisson-hotels",
    email: "",
    mapUrl: "",
    filterId: "stay",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 3,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#0fc2ad}</style><path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"/></svg>`,
    title: "Spice Island Beach Resort",
    position: {
      lat: 12.022228240966797,
      lng: -61.764835357666016,
    },
    website: "https://www.spiceislandbeachresort.com",
    email: "reservations@spicebeachresort.com",
    mapUrl: "",
    filterId: "stay",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 4,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#c2660f}</style><path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"/></svg>`,
    title: "Mount Cinnamon Hotel & Beach Club Grenada",
    position: {
      lat: 12.020528793334961,
      lng: -61.7680549621582,
    },
    website: "https://mountcinnamongrenadahotel.com",
    email: "",
    mapUrl: "",
    filterId: "stay",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 5,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#c22a0f}</style><path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"/></svg>`,
    title: "Royalton Grenada, An Autograph Collection All-Inclusive Resort",
    position: {
      lat: 12.01028823852539,
      lng: -61.78280258178711,
    },
    website: "https://www.royaltonresorts.com/royalton-grenada",
    email: "",
    mapUrl: "",
    filterId: "stay",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 6,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#a40fc2}</style><path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"/></svg>`,
    title: "Sandals Grenada",
    position: {
      lat: 12.007808685302734,
      lng: -61.79435348510742,
    },
    website: "https://www.sandals.com/sandals-grenada",
    email: "",
    mapUrl: "",
    filterId: "stay",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 7,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#0f8eae}</style><path d="M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0L189.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zM317.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5L317.8 47.6zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c-35.3 0-64 28.7-64 64v71c8.3 5.2 18.1 9 28.8 9c13.5 0 27.2-6.1 38.4-13.4c5.4-3.5 9.9-7.1 13-9.7c1.5-1.3 2.7-2.4 3.5-3.1c.4-.4 .7-.6 .8-.8l.1-.1 0 0 0 0s0 0 0 0s0 0 0 0c3.1-3.2 7.4-4.9 11.9-4.8s8.6 2.1 11.6 5.4l0 0 0 0 .1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c3-3.5 7.4-5.4 12-5.4s9 2 12 5.4l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c2.9-3.4 7.1-5.3 11.6-5.4s8.7 1.6 11.9 4.8l0 0 0 0 0 0 .1 .1c.2 .2 .4 .4 .8 .8c.8 .7 1.9 1.8 3.5 3.1c3.1 2.6 7.5 6.2 13 9.7c11.2 7.3 24.9 13.4 38.4 13.4c10.7 0 20.5-3.9 28.8-9V288c0-35.3-28.7-64-64-64V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H256V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H128V176zM448 394.6c-8.5 3.3-18.2 5.4-28.8 5.4c-22.5 0-42.4-9.9-55.8-18.6c-4.1-2.7-7.8-5.4-10.9-7.8c-2.8 2.4-6.1 5-9.8 7.5C329.8 390 310.6 400 288 400s-41.8-10-54.6-18.9c-3.5-2.4-6.7-4.9-9.4-7.2c-2.7 2.3-5.9 4.7-9.4 7.2C201.8 390 182.6 400 160 400s-41.8-10-54.6-18.9c-3.7-2.6-7-5.2-9.8-7.5c-3.1 2.4-6.8 5.1-10.9 7.8C71.2 390.1 51.3 400 28.8 400c-10.6 0-20.3-2.2-28.8-5.4V480c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V394.6z"/></svg>`,
    title: "True Blue Bay Resort",
    position: {
      lat: 12.000312492233384,
      lng: -61.768568271488,
    },
    website: "https://www.truebluebay.com",
    email: "reservations@truebluebay.com",
    mapUrl: "",
    filterId: "stay",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 8,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#a40fc2}</style><path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"/></svg>`,
    title: "The Beach Club at Calabash",
    position: {
      lat: 12.00253743930944,
      lng: -61.75993382449059,
    },
    website: "https://www.calabashhotel.com/beach-club",
    email: "Reservations@CalabashGrenada.com",
    mapUrl: "",
    filterId: "stay",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  // Things to do
  {
    id: 9,
    png: 0,
    title: "Leatherback Sea Turtles Tour at Levera National Park",
    position: {
      lat: 12.222794998110317,
      lng: -61.612931293949785,
    },
    website: "https://caribbeanhorizons.com/grenada-turtle-watching/",
    email: "info@caribbeanhorizons.com",
    mapUrl: "https://maps.app.goo.gl/7v69aerpeY4nN5p59",
    filterId: "do",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 10,
    png: 1,
    title: "Street Food Wednesday at the Dodgy Dock",
    position: {
      lat: 12.00042635320048,
      lng: -61.7687359033394,
    },
    website:
      "https://www.truebluebay.com/restaurant/dodgy-dock-restaurant-and-bar",
    email: "reservations@truebluebay.com",
    mapUrl: "https://maps.app.goo.gl/nAWL2BK3Fn7QK5gP8",
    filterId: "do",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 11,
    png: 2,
    title: "Hiking at Seven Sisters Falls (pack a swimsuit)",
    position: {
      lat: 12.10169227673263,
      lng: -61.68210293069151,
    },
    website: "https://www.puregrenada.com/product/seven-sisters",
    email: "info@puregrenda.com",
    mapUrl: "https://maps.app.goo.gl/jXkbZVu8fTugZW5o6",
    filterId: "do",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 12,
    png: 3,
    title: "Belmont Estate Chocolate Tour",
    position: {
      lat: 12.175034944403324,
      lng: -61.62689531349067,
    },
    website: "https://belmontestategrenada.com/",
    email: "info@belmontestategrenada.com",
    mapUrl: "https://maps.app.goo.gl/TgEL2HFKqscHEDTa7",
    filterId: "do",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 13,
    png: 4,
    title: "Fort George Walking Tour",
    position: {
      lat: 12.050323319623335,
      lng: -61.753733000000004,
    },
    website: "https://www.puregrenada.com/product/fort-george-2/",
    email: "info@puregrenda.com",
    mapUrl: "https://maps.app.goo.gl/JNwmmiGRepEAUm488",
    filterId: "do",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 14,
    png: 5,
    title: "Gouyave Nutmeg Factory Tour",
    position: {
      lat: 12.166614908536209,
      lng: -61.73146800000001,
    },
    website:
      "https://www.puregrenada.com/product/gouyave-nutmeg-processing-station/",
    email: "info@puregrenda.com",
    mapUrl: "https://maps.app.goo.gl/ry1M6zBnKuPBkvj26",
    filterId: "do",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 15,
    png: 6,
    title: "Annandale Falls (bring a swimsuit)",
    position: {
      lat: 12.088393854285556,
      lng: -61.71693764553206,
    },
    website: "https://www.puregrenada.com/product/annandale-waterfalls/",
    email: "info@puregrenda.com",
    mapUrl: "https://maps.app.goo.gl/PMU8uBzvTXpvQT8K6",
    filterId: "do",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 16,
    png: 7,
    title: "Westerhall Estate Rum Distillery Tour",
    position: {
      lat: 12.019979400825074,
      lng: -61.703646084654245,
    },
    website: "https://www.puregrenada.com/product/westerhall-estate/",
    email: "info@puregrenda.com",
    mapUrl: "https://maps.app.goo.gl/Y3P7sTMJtdKqabxi8",
    filterId: "do",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
  {
    id: 17,
    png: 8,
    title: "Grenada Etang Lake Hiking",
    position: {
      lat: 12.094360564431678,
      lng: -61.69406450252602,
    },
    website:
      "https://www.puregrenada.com/product/grand-etang-national-park-forest-reserve/",
    email: "info@puregrenda.com",
    mapUrl: "https://maps.app.goo.gl/NCdU4ixLUriZQJay5",
    filterId: "do",
    get distanceFromVenue() {
      return calculateDistance(venuePosition, this.position);
    },
    get distanceFromCouple() {
      return calculateDistance(coyabaPosition, this.position);
    },
  },
];
