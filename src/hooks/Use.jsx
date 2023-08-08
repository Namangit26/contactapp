import React from 'react'
import { useState } from 'react';

const Use = () => {
    const [ifOpen, Setopen] = useState(false);
    const onopen = () => {
        Setopen(true);
    }
    const onclose = () => {
        Setopen(false);
    }
    return (
       {onclose,onopen,ifOpen}
    )
}

export default Use