import "react-leaflet";
import { TileLayerOptions } from "leaflet";

declare module "react-leaflet" {
  interface TileLayerProps extends TileLayerOptions {}
}
