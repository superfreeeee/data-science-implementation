export const transformGraphData = (graph) => {
  const graphList = [];
  const { id: index, nodes, edges } = graph;
  let isInit = true;
  for (const node of nodes) {
    const { properties, identity, labels, cls } = node;
    const data = {
      id: identity,
      labels,
    };
    if (properties) {
      Object.assign(data, properties);
    } else {
      data.name = '';
    }

    const toBeAdded = {
      group: 'nodes',
      data,
      classes: `${cls}`,
    };
    const { x, y } = properties;
    if (x != null && y != null) {
      toBeAdded.position = {
        x: parseFloat(x),
        y: parseFloat(y),
      };
    } else {
      isInit = false;
    }
    graphList.push(toBeAdded);
  }

  for (const edge of edges) {
    const data = {};
    if (edge.properties) {
      for (var keyE in edge.properties) {
        if (keyE !== 'type') {
          data[keyE] = edge.properties[keyE];
        }
      }
    }
    data.id = edge.identity;
    data.source = edge.start;
    data.target = edge.end;
    data.name = edge.type;
    const toBeAdded = {
      group: 'edges',
      data,
    };
    graphList.push(toBeAdded);
  }

  return {
    graphList,
    isInit,
    index,
  };
};
