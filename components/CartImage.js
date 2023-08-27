import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function CartImage({ Cart, product }) {
    const [isInCart, setIsInCart] = useState("/Icons/addCart.svg");

    useEffect(() => {
        const keysArray = Object.keys(Cart);
        console.log(keysArray)
        if (keysArray.find((it) => it.title === product.title) !== undefined) {
            setIsInCart("/Icons/isCart.svg");
        } else {
            setIsInCart("/Icons/addCart.svg");
        }
    }, [Cart])

    return (
        <Image
            src={isInCart}
            alt="Cart"
            width={30}
            height={30}
        />
    )
}

export default CartImage;
