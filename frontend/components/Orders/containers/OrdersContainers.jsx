import React, { useContext, useEffect } from 'react';
import { OrdersContext } from '../../../contexts/Order';
import List from '../components/List';
import WaitList from '../components/WaitList';

function OrdersContainers({status}) {
    const content = useContext(OrdersContext)

    return (
        <div>
            {status === "complete" &&  <List content={content} />}
            {status === "wait" && <WaitList content={content} /> }
            {status === "cancel" && <List content={content} />}
        </div>
    );
}

export default OrdersContainers;