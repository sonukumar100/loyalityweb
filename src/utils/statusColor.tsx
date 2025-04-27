export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case '1':
      return '#C8E6C9'; // Approved
    case '0':
      return '#FFF3E0'; // Pending
    case '2':
      return '#FFCDD2'; // Rejected
    default:
      return '#E0E0E0'; // Unknown
  }
};
export const getTabColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'approved':
      return '#C8E6C9'; // Approved
    case 'pending':
      return '#FFF3E0'; // Pending
    case 'reject':
      return '#FFCDD2'; // Rejected
    default:
      return '#E0E0E0'; // Unknown
  }
};

export const getStatusTextColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case '1':
      return '#388E3C';
    case '0':
      return '#F57C00';
    case '2':
      return '#D32F2F';
    default:
      return '#555';
  }
};
