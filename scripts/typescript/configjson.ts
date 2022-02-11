function included(attribute: string, ...items: string[]) {
  return function (ctx: any) {
    const attrPrefix = ctx[attribute].split("_")[0];
    return items.includes(ctx[attribute]) || items.some(it => it === `${attrPrefix}*`);
  }
}

function any(...funcs: any[]) {
  return function (ctx: any) {
    return funcs.some(func => func(ctx));
  }
}

//Order matters! : Your include filters will cascade down in their effects

export default {
  "background": {
    "label": "Background",
    "attributes": {
      "black": {
        "label": "Black",
        "weight": 0.1,
        "include": () => true,
      },
      "red": {
        "label": "Red",
        "weight": 0.1,
        "include": () => true,
      },
      "yellow": {
        "label": "Yellow",
        "weight": 0.1,
        "include": () => true,
      },
      "teal": {
        "label": "Teal",
        "weight": 0.1,
        "include": () => true,
      },
    }
  },
  "floor": {
    "label": "Floor",
    "attributes": {
      "tile_gray": {
        "label": "Gray Tile",
        "weight": 0.1,
        "include": () => true,
      },
      "tile_darkbrown": {
        "label": "Darkbrown Tile",
        "weight": 0.1,
        "include": () => true,
      },
      "tile_lightbrown": {
        "label": "Lightbrown Tile",
        "weight": 0.1,
        "include": () => true,
      },
      "glass": {
        "label": "Glass",
        "weight": 0.1,
        "include": included("background", "black", "red"),
      },
    },
  },
  "wall": {
    "label": "Wall",
    "attributes": {
      "smooth_lightgray": {
        "label": "Lightgray Smooth",
        "weight": 0.1,
        "include": () => true,
      },
      "smooth_darkgray": {
        "label": "Darkgray Smooth",
        "weight": 0.1,
        "include": () => true,
      },
      "smooth_white": {
        "label": "White Smooth",
        "weight": 0.1,
        "include": included("floor", "tile*"),
      },
    },
  },
}