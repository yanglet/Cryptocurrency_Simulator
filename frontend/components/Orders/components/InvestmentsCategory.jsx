import React from 'react';
import CateogrySelect from './CategorySelect';


function InvestmentsCategory({ setCategoryName }) {
    return (
    <div>
      <div className="bg-white flex border-b">
        {["balance", "history", "wait_orders", "cancel_orders"].map((category, index) => {
          return (
            <CateogrySelect
            
              key={index}
              categoryName={category}
              setCategoryName={setCategoryName}
            />
          );
        })}
      </div>
    
        </div>
    );
}

export default InvestmentsCategory;