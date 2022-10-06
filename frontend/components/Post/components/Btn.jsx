import React from 'react';
import Link from 'next/link';
function Btn({src, color, value}) {
    return (
            <Link href={src}>
                <button className={color}>{value}</button>
            </Link>
    );
}

export default Btn;
