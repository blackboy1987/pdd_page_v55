import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import isEqual from 'lodash/isEqual';
import {message} from "antd";

export type DragImageProps = {
  list: string[];
  onEnd: (items: {
    id: string;
    content: string;
  }[]) => void;
};
export type DragImageState = {
  items: {
    id: string;
    content: string;
  }[];
  list: string[];
};

const reorder = (list: {id: string,content: string}[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: {[key: string]: string}) => ({
  userSelect: 'none',
  margin: `0 ${grid}px ${grid}px 0`,
  flexWrap: 'wrap',
  overflow: 'hide',
  position: 'relative',
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  flexWrap: 'wrap',
  overflow: 'hide',
});

class DragImage extends React.Component<DragImageProps, DragImageState> {

  static getDerivedStateFromProps(nextProps: DragImageProps, preState: DragImageState) {
    if (isEqual(nextProps.list, preState.list)) {
      return null;
    }
    return {
      list: nextProps.list,
      items: nextProps.list.map((item,index)=>({
        id: index,
        content: item,
      })),
    };
  }

  constructor(props: DragImageProps) {
    super(props);
    this.state = {
      list: props.list,
      items: props.list.map((item, index) => ({
        id: `item-${index}`,
        content: item,
      })),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result: any) {
    const {onEnd} = this.props;
    if (!result.destination) {
      return;
    }

    const items = reorder(this.state.items, result.source.index, result.destination.index);
    this.setState({
      items,
    });
    onEnd(items);
  }

  remove = (id: string) => {
    const {onEnd} = this.props;
    const { items } = this.state;
    if (items.length <= 1) {
      message.error('至少保留一张图片');
      return;
    }

    const newList = items.filter((item) => item.id !== id);
    this.setState({
      items: newList.map((item, index) => ({
        id: `item-${index}`,
        content: item.content,
      })),
    });
    onEnd(newList);
  };

  render() {
    const {items} = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided: any, snapshot: any) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided1: any, snapshot1: any) => (
                    <div
                      ref={provided1.innerRef}
                      {...provided1.draggableProps}
                      {...provided1.dragHandleProps}
                      style={getItemStyle(snapshot1.isDragging, provided1.draggableProps.style)}
                    >
                      {
                        items.length>1 ? (
                          <a
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              width: 16,
                              height: 14,
                              borderRadius: '0 0 0 100%',
                              background: 'rgba(0,0,0,.6)',
                              zIndex: 10,
                            }}
                            title="点击移除该图片"
                            onClick={() => this.remove(item.id)}
                          >
                            <CloseOutlined
                              style={{
                                color: '#fff',
                                fontSize: 10,
                                position: 'absolute',
                                top: 1,
                                right: 1,
                              }}
                            />
                          </a>
                        ) : null
                      }
                      <img src={`${item.content}?x-oss-process=style/100`} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DragImage;
