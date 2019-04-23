// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
//

import React from 'react'
import ReactDOM from 'react-dom'
import Board from './component/dnd/board';
import { observe } from './component/dnd/game'

const root = document.getElementById('root')

observe(knightPosition =>
    ReactDOM.render(<Board knightPosition={knightPosition} />, root),
)

// import React, { useEffect, useState } from 'react'
// import Board from './component/dnd/board'
// import { observe } from './component/dnd/game'
//
// /**
//  * The Chessboard Tutorial Application
//  */
// const ChessboardTutorialApp = () => {
//     const [knightPos, setKnightPos] = useState([1, 7])
//
//     // the observe function will return an unsubscribe callback
//     useEffect(() => observe((newPos) => setKnightPos(newPos)))
//     return (
//         <div style={{
//             width: 500,
//             height: 500,
//             border: '1px solid gray',
//         }}>
//             <Board knightPosition={knightPos} />
//         </div>
//     )
// }
// const root = document.getElementById('root')
// ReactDOM.render(<ChessboardTutorialApp />, root)
