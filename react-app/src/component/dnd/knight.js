import React, { Component } from 'react';
import { DragDropContextProvider, DragSource  } from 'react-dnd';
import { ItemTypes } from './contants'

// Define Drag Types
const knightSource = {
    beginDrag(props) {
        return {}
    },
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

function Knight({ connectDragSource, isDragging }) {
    return connectDragSource(
        <div
            style={{
                opacity: isDragging ? 0.5 : 1,
                fontSize: 25,
                fontWeight: 'bold',
                cursor: 'move',
            }}
        >
            ♘
        </div>,
    )
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
//
// export default function Knight() {
//     return <span>♘</span>
// }
