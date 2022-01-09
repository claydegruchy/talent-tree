// var sizes = [...Array(5).keys()]
//   .filter((a) => !(a % 2))
//   .filter((a) => a > 2)
//   .map((a, i, v) => );

var fontSize = 12;

var sizes = [
  // {
  //   selector: `node[[degree>1]]`,
  //   style: {
  //     'font-size': fontSize * 1.2,
  //   },
  // },
  // {
  //   selector: `node[[degree>2]]`,
  //   style: {
  //     'font-size': fontSize * 1.4,
  //   },
  // },
  // {
  //   selector: `node[[degree>4]]`,
  //   style: {
  //     'font-size': fontSize * 3,
  //   },
  // },
  // {
  //   selector: `node[[degree>8]]`,
  //   style: {
  //     'font-size': fontSize * 6,
  //   },
  // },
];

var exportLayout = {
  klay: {
    // direction: 'horizontal', // Overall direction of edges: horizontal (right / left) or vertical (down / up)
    direction: 'UP', // Overall direction of edges: horizontal (right / left) or vertical (down / up)
    fixedAlignment: 'RIGHTDOWN',
    edgeSpacingFactor: 0.1,
    // crossingMinimization: 'INTERACTIVE',
  },

  nodeDimensionsIncludeLabels: false,
  // number of ticks per frame; higher is faster but more jerky
  refresh: 30,
  // Whether to fit the network view after when done
  fit: true,
  // Padding on fit
  padding: 10,
  // Whether to enable incremental mode
  randomize: true,
  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: 4500,
  // Ideal (intra-graph) edge length
  idealEdgeLength: 500,
  // Divisor to compute edge forces
  edgeElasticity: 0.25,
  // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
  nestingFactor: 0.1,
  // Gravity force (constant)
  gravity: 1.25,
  // Maximum number of iterations to perform
  numIter: 2500,
  // Whether to tile disconnected nodes
  tile: true,
  // Type of layout animation. The option set is {'during', 'end', false}
  animate: 'end',
  // Duration for animate:end
  animationDuration: 500,
  // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
  tilingPaddingVertical: 10,
  // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
  tilingPaddingHorizontal: 10,
  // Gravity range (constant) for compounds
  gravityRangeCompound: 1.5,
  // Gravity force (constant) for compounds
  gravityCompound: 1.0,
  // Gravity range (constant)
  gravityRange: 3.8,
  // Initial cooling factor for incremental layout
  initialEnergyOnIncremental: 0.5,
};

var colours = {
  background: 'gray',
  reply: '#d3d3d3',
  text: 'rgb(25,84,166)',
};

const ChartStyle = [
  {
    selector: 'node',
    style: {
      'background-color': colours.reply,
      width: 'label',
      height: 'label',
      padding: '6px',
      shape: 'round-rectangle',
      // 'border-color': 'green',
      'border-width': '1',
    },
  },

  {
    selector: 'node[label]',
    style: {
      label: 'data(label)',
      'font-size': fontSize,
      color: colours.text,
      'text-halign': 'center',
      'text-valign': 'center',
    },
  },
  {
    selector: 'edge[name]',
    style: {
      'font-size': fontSize,

      'text-background-color': 'white',
      'text-background-opacity': 1,
      'text-background-padding': '2px',

      'text-border-color': 'black',
      'text-border-style': 'solid',
      'text-border-width': 0.5,
      'text-border-opacity': 1,

      'text-rotation': 'autorotate',
    },
  },
  {
    selector: 'node[weight]',
    style: {
      'font-size': 'data(weight)',
    },
  },

  ...sizes,
  {
    selector: 'edge',
    style: {
      width: '3',
      // width: "data(weight)",
      'arrow-scale': 1,

      'curve-style': 'bezier',
      'source-arrow-shape': 'triangle',

      'line-style': 'solid',
    },
  },

  {
    selector: 'node.found',
    style: {
      'font-size': fontSize * 1.2,
      // 'border-color': 'black',
      'border-width': '5',
      'background-color': 'pink',
    },
  },

  {
    selector: 'node:selected',
    style: {
      'border-color': 'red',
      'border-width': '5',
    },
  },

  {
    selector: '.neighbor-selected.successor',
    style: {
      'border-color': 'blue',
      'border-width': '2',

      // 'background-color': 'green',
      'line-color': 'blue',
    },
  },

  {
    selector: '.neighbor-selected.incoming',
    style: {
      'border-color': 'green',
      'border-width': '3',

      // 'background-color': 'green',
      'line-color': 'green',
    },
  },

  {
    selector: '.neighbor-selected.outgoing',
    style: {
      'border-color': 'orange',
      'border-width': '3',

      // 'background-color': 'orange',
      'line-color': 'orange',
    },
  },

  {
    selector: 'edge.neighbor-selected.highlight',
    style: {
      label: 'data(name)',
      'control-point-step-size': 30,
    },
  },
  {
    selector: 'edge.neighbor-selected.highlight',
    style: {
      label: 'data(name)',
      'control-point-step-size': 30,
    },
  },

  {
    selector: 'node.highlight',
    style: {
      'border-color': 'red',
      'border-width': '3',

      // 'border-style': 'dotted',
    },
  },

  {
    selector: 'edge.highlight',
    style: {
      width: 2.5,
      'target-arrow-shape': 'triangle',
      'arrow-scale': 1,
    },
  },

  {
    selector: 'edge.hover.highlight',
    style: {
      width: 2.5,
    },
  },


];

export { ChartStyle, colours, exportLayout };
