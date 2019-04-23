let knightPosition = [1, 7]
let observers = [];

function emitChange() {
    observers.forEach(o => o && o(knightPosition))
}

const squareTarget = {
    drop(props, monitor) {
        moveKnight(props.x, props.y)
    },
}

export function observe(o) {
    observers.push(o);
    emitChange();
    return () => {
        observers = observers.filter(t => t !== o)
    };
}

export function moveKnight(toX, toY) {
    console.log('toX, toY:', toX, toY);
    knightPosition = [toX, toY]
    emitChange()
}

export function canMoveKnight(toX, toY) {
    const [x, y] = knightPosition
    const dx = toX - x
    const dy = toY - y

    return (
        (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    )
}
