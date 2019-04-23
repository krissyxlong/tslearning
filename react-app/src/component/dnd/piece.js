import React from 'react'
import Knight from './Knight'

export default function (isKnight) {
    if (isKnight) {
        return <Knight />;
    }
    return null;
}
