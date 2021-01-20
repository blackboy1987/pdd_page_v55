import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { message } from 'antd';

export type DragImageProps = {
  list: string[];
};
export type DragImageState = {
  items: {
    id: string;
    content: string;
  };
  list: string[];
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  margin: `0 ${grid}px ${grid}px 0`,
  flexWrap: 'wrap',
  overflow: 'hide',
  position: 'relative',
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  flexWrap: 'wrap',
  overflow: 'hide',
});

class DragImage extends React.Component<DragImageProps, DragImageState> {
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

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(this.state.items, result.source.index, result.destination.index);

    this.setState({
      items,
    });
  }

  remove = (id: string) => {
    const { items } = this.state;
    if (items.length <= 1) {
      message.error('至少保留一张图片');
      return;
    }

    const newList = items.filter((item) => item.id !== id);
    console.log(newList);
    this.setState({
      items: newList.map((item, index) => ({
        id: `item-${index}`,
        content: item.content,
      })),
    });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
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
