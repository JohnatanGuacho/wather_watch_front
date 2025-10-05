export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  map: {
    defaultCenter: { lat: 4.6097, lon: -74.0817 },
    defaultZoom: 10
  },
  gibs: {
    template: 'https://map1.vis.earthdata.nasa.gov/wmts-geo/1.0.0/{layer}/default/{date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
    layer: 'MODIS_Terra_CorrectedReflectance_TrueColor'
  }
};