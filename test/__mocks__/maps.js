/* eslint-disable @typescript-eslint/no-empty-function */

// mock for google maps api
window.google = {
  maps: {
    Marker: class {},
    Map: class {
      setTilt() {}

      fitBounds() {}
    },
    LatLngBounds: class {},
    places: {
      Autocomplete: class {},
      AutocompleteService: class {},
      PlacesServiceStatus: {
        INVALID_REQUEST: 'INVALID_REQUEST',
        NOT_FOUND: 'NOT_FOUND',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
      PlacesAutocomplete: {
        INVALID_REQUEST: 'INVALID_REQUEST',
        NOT_FOUND: 'NOT_FOUND',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },

    MarkerClusterer: class {},
    Geocoder: class {},
  },
};
