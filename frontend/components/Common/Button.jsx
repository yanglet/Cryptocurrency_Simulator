import React from 'react';
import Link from 'next/link';

function Button( { color, src, title}) {
    return (
        <div className={`my-auto rounded-full font-semibold hover:bg-gray-300  ${color}`}>
            <Link href={`${src}`}>{title}</Link>
      </div>
    );
}

export default Button;