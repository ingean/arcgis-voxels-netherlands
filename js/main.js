import esriConfig from 'https://js.arcgis.com/4.23/@arcgis/core/config.js'
import Map from "https://js.arcgis.com/4.23/@arcgis/core/Map.js"
import SceneView from "https://js.arcgis.com/4.23/@arcgis/core/views/SceneView.js"
import VoxelLayer from "https://js.arcgis.com/4.23/@arcgis/core/layers/VoxelLayer.js"
import VectorTileLayer from 'https://js.arcgis.com/4.23/@arcgis/core/layers/VectorTileLayer.js'
import ActionBar from './ActionBar.js'
import MapTheme from './MapTheme.js'
import * as OAuth2 from './OAuth2.js'

//esriConfig.apiKey = 'AAPKf28ba4fdd1e945a1be5f8d43dbd650eaMjyiDjdFXaCPZzo5erYJ7Xc7XKvBlbJZIPvNu0O2zwfeFiGhqoBvtQwJUZ1DMXIL'
//const portal = await OAuth2.authenticate() //Authenticate with named user using OAuth2

const theme = new MapTheme() // Contains light and dark basemap

// Initialize voxel layer with URL
const vxlLayer = new VoxelLayer({
  url: "https://tiles.arcgis.com/tiles/2JyTvMWQSnM2Vi8q/arcgis/rest/services/geotop_scene_layer/SceneServer",
  visible: true
})

const map = new Map({
  layers: [vxlLayer],
  basemap: {
    baseLayers: [
      new VectorTileLayer({
        url: "https://tiles.arcgis.com/tiles/nSZVuSZjHpEZZbRo/arcgis/rest/services/Topo_RD/VectorTileServer"
      })
    ]
  },
  ground: {
    navigationConstraint: "none"
  }
})

const view = new SceneView({
  container: "viewDiv",
  qualityProfile: "high",
  map: map,
  environment: {
    starsEnabled: false,
    atmosphereEnabled: false
  },
  viewingMode: "local", // VoxelLayer are only supported in local viewing
})

const actionBar = new ActionBar(view)

const title = 'Voxeldemo'
document.querySelector("#header-title").textContent = title
document.querySelector("calcite-shell").hidden = false
document.querySelector("calcite-loader").active = false