import React, { useState, createContext, useContext } from 'react';
type DateRange = '1d' | '7d' | '30d' | 'custom';
type DateRangeContextType = {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  customDateRange: {
    start: Date | null;
    end: Date | null;
  };
  setCustomDateRange: (range: {
    start: Date | null;
    end: Date | null;
  }) => void;
};
const DateRangeContext = createContext<DateRangeContextType>({
  dateRange: '7d',
  setDateRange: () => {},
  customDateRange: {
    start: null,
    end: null
  },
  setCustomDateRange: () => {}
});
export const useDateRange = () => useContext(DateRangeContext);
export const DateRangeProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [dateRange, setDateRange] = useState<DateRange>('7d');
  const [customDateRange, setCustomDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null
  });
  return <DateRangeContext.Provider value={{
    dateRange,
    setDateRange,
    customDateRange,
    setCustomDateRange
  }}>
      {children}
    </DateRangeContext.Provider>;
};