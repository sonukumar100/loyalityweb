// Inputs and calendar pickers for date, type, title, etc.

type RedeemFiltersProps = {
  dateFilter: Date | undefined;
  setDateFilter: (date: Date | undefined) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  titleFilter: string;
  setTitleFilter: (val: string) => void;
  CouponCodeFilter: string;
  setCouponCodeFilter: (val: string) => void;
  startDateFilter: Date | undefined;
  setStartDateFilter: (val: Date | undefined) => void;
  endDateFilter: Date | undefined;
  setEndDateFilter: (val: Date | undefined) => void;
};

// Implement the UI and logic using the above props
