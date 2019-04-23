import React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import html5Backend from 'react-dnd-html5-backend'
import Square from './square'
import Knight from './knight'
import BoardSquare from './borderSquare'
import { canMoveKnight, moveKnight } from './game'

function renderSquare(i, knightPosition) {
    const x = i % 8
    const y = Math.floor(i / 8)
    return (
        <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
            <BoardSquare x={x} y={y}>
                {renderPiece(x, y, knightPosition)}
            </BoardSquare>
        </div>
    )
}

function renderPiece(x, y, [knightX, knightY]) {
    if (x === knightX && y === knightY) {
        return <Knight />
    }
}

function handleSquareClick(toX, toY) {
    console.log(1111);
    if (canMoveKnight(toX, toY)) {
        moveKnight(toX, toY)
    }
}

export default function ({ knightPosition }) {
    const squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPosition))
    }

    return (
        <DragDropContextProvider backend={html5Backend}>
            <div
                style={{
                    width: 400,
                    height: 400,
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                {squares}
            </div>
        </DragDropContextProvider>
    )
}
