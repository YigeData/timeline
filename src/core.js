var Default = ht.Default,
    def = Default.def,
    ui = ht.ui,
    NULL = null;

Default.setImage('ht_ui_timeline_icon', {
    "width": 22,
    "height": 22,
    "blendMode": "override_rgb",
    "comps": [
      {
        "type": "oval",
        "background": {
          "func": "attr@color",
          "value": "rgb(228,231,237)"
        },
        "borderColor": "#979797",
        "opacity": 0.2,
        "rect": [
          1,
          1,
          20,
          20
        ]
      },
      {
        "type": "oval",
        "background": {
          "func": "attr@color",
          "value": "rgb(228, 231, 237)"
        },
        "borderColor": "#979797",
        "rect": [
          5,
          5,
          12,
          12
        ]
      }
    ]
  })