import React from 'react';
import FlightSearchResult from '../FlightSearchResult';

const QuotationFlight = ({selectQut}) => {
  return (
    <div>
      {selectQut?.map((item, i) => (
        <FlightSearchResult
          key={i}
          index={i}
          data={item}
        //   uniqueCarriers={result}
        //   tripType={tripType}
          totalPassenger={totalPassenger}
          pageData={pageData}
          setSelected={setSelected}
          selected={selected}
        />
      ))}
    </div>
  );
};

export default QuotationFlight;
