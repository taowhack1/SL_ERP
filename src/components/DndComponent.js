import React, { useContext, useState } from "react";
import { Tabs } from "antd";
import { DndProvider, DragSource, DropTarget } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TabContext } from "../include/js/context";

// Drag & Drop node
class TabNode extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget, children } = this.props;

    return connectDragSource(connectDropTarget(children));
  }
}

const cardTarget = {
  drop(props, monitor) {
    const dragKey = monitor.getItem().index;
    const hoverKey = props.index;

    if (dragKey === hoverKey) {
      return;
    }

    props.moveTabNode(dragKey, hoverKey);
    monitor.getItem().index = hoverKey;
  },
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const WrapTabNode = DropTarget("DND_NODE", cardTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource("DND_NODE", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(TabNode)
);

const DraggableTabs = (props) => {
  const { tabOrder, setTabOrder } = useContext(TabContext);
  const [state, setState] = useState({
    order: [],
  });
  //   state = {
  //     order: [],
  //   };

  const moveTabNode = (dragKey, hoverKey) => {
    const newOrder = state.order.slice();
    const { children } = props;

    React.Children.forEach(children, (c) => {
      if (newOrder.indexOf(c.key) === -1) {
        newOrder.push(c.key);
      }
    });

    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);

    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);

    setState({
      ...state,
      order: newOrder,
    });
    setTabOrder({
      ...tabOrder,
      dragKey,
      hoverKey,
      newTabOrder: newOrder,
    });
    console.log("moveTab", state.order, newOrder);
  };

  const renderTabBar = (props, DefaultTabBar) => (
    <DefaultTabBar {...props}>
      {(node) => (
        <WrapTabNode key={node.key} index={node.key} moveTabNode={moveTabNode}>
          {node}
        </WrapTabNode>
      )}
    </DefaultTabBar>
  );

  const { order } = state;
  const { children } = props;

  const tabs = [];
  React.Children.forEach(children, (c) => {
    tabs.push(c);
  });

  const orderTabs = tabs.slice().sort((a, b) => {
    const orderA = order.indexOf(a.key);
    const orderB = order.indexOf(b.key);

    if (orderA !== -1 && orderB !== -1) {
      return orderA - orderB;
    }
    if (orderA !== -1) {
      return -1;
    }
    if (orderB !== -1) {
      return 1;
    }

    const ia = tabs.indexOf(a);
    const ib = tabs.indexOf(b);

    return ia - ib;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Tabs renderTabBar={renderTabBar} {...props}>
        {orderTabs}
      </Tabs>
    </DndProvider>
  );
};

export default React.memo(DraggableTabs);
