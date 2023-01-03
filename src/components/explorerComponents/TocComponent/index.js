import React, { Component } from "react";
import { LayerComponent } from "./layer_component";
import { Tooltip, Button } from "antd";
import * as query from "@arcgis/core/rest/query";
import { Slider } from "antd";
import * as watchUtils from "@arcgis/core/core/watchUtils";
import { mapUrl } from "../../../config";
import { layersSetting } from "../../../helper/layers";

class TocComponent extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      layers: props.map.__mapInfo.info,
    };
  }
  startOperation() {
    this.setState({
      showPopUp: !this.state.showPopUp,
    });
  }
  expand(layer, key) {
    let { layers } = this.state;
    layers.$legends[key].show = !layers.$legends[key].show;
    this.setState({ layers });
  }
  changeLayer(layer, key) {
    let { layers } = this.state;
    layers.$legends[key].visible = !layers.$legends[key].visible;
    this.setState({ layers });

    let visibiles = this.state.layers.$legends
      .filter((layer) => layer.visible)
      .map((d) => d.layerId);

    //this.props.info.mapVisibleLayerIDs = visibiles;

    debugger
    this.props.map
      .findLayerById("baseMap")
      .allSublayers._items.forEach((layer) => {
        if (!layer.sublayers) {
          let l = visibiles.find((x) => x == layer.id);
          layer.visible = l != null ? true : false;
        }
      });
  }


  onSliderChange = (value) => {
    this.props.map.findLayerById("baseMap").opacity = value / 100;
  };

  zoomToLayer(layer) {
    if (layer && layer.minScale > 0 && layer.disable) {
      var dpi = 96; // Set to resolution of your screen
      var scale = layer.minScale;
      this.props.map.view.scale = scale;
    }

  }
  componentDidMount() {
    var self = this;
    let { layers } = this.state;
    watchUtils.when(this.props.map.view, "stationary", (evt) => {
      if (evt) {
        debugger;
        var mapScale = this.props.map.view.scale;
        // visable layers in thier scale
        layers.$legends.forEach((layer) => {
          let minScale = layer.minScale;
          let maxScale = layer.maxScale;

          if (
            (maxScale <= mapScale || maxScale == 0) &&
            (minScale >= mapScale || minScale == 0)
          ) {
            layer.disable = "enableLabel";
          } else {
            layer.disable = "disableLabel";
          }
        });

        self.setState({ layers });
      }
    });
  }
  render() {
    const legends = this.state.layers.$legends;
    return (
      <section className="toc">
        <div style={{ marginTop: "10px" }}>
          <label style={{ marginRight: "10px" }}>الشفافية</label>
          <div style={{ paddingLeft: "20px" }}>
            <Slider defaultValue={100} onChange={this.onSliderChange} />
          </div>
          <ul style={{ padding: "5px" }}>
            {legends.map((layer, key) => {
              return (
                !layer.isHidden &&
                layersSetting[layer.layerName] && (
                  <li style={{ direction: "rtl" }}>
                    <LayerComponent
                      {...{
                        layer,
                        changeLayer: this.changeLayer.bind(this, layer, key),
                        zoomToLayer: this.zoomToLayer.bind(this, layer, key),
                        expand: this.expand.bind(this, layer, key),
                      }}
                    />
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}
export default TocComponent;
