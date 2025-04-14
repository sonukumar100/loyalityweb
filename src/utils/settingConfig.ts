// import _ from 'lodash'; // Importing lodash
import _ from 'lodash'; // Importing lodash
export const imageUrl = 'https://assets-futuremortgage-com.s3.amazonaws.com/';

export const settingConfig = {
  fieldsToCheck: ['homeValue', 'loanAmount', 'creditScore', 'loanPercentage'],

  fields: [
    'address',
    'loanType',
    'loanPercentage',
    'amortizationType',
    'aprRequested',
    'propertyType',
    'propertyUse',
    'homeValue',
    'loanAmount',
    'creditScore',
    'annualIncome',
    'isVaEligible',
    'amortizationType',
    'propertyType',
    'propertyUse',
  ],
  compensation: [
    {
      key: 1,
      actValue: '1',
      value: 'Universal Plan',
    },
    {
      key: 2,
      actValue: '2',

      value: 'Branch Manager',
    },
    {
      key: 3,
      actValue: '3',

      value: 'Division Manager',
    },
  ],
  clientStatus: [
    {
      key: 1,
      value: 'New',
    },
    {
      key: 2,
      value: 'Responded',
    },
    {
      key: 3,
      value: 'Nurturing',
    },
    {
      key: 4,
      value: 'Working',
    },
    {
      key: 5,
      value: 'Past Client',
    },
  ],
  rowsPerPage: [
    {
      key: '10',
      value: 10,
    },
    {
      key: '20',
      value: 20,
    },
    {
      key: '30',
      value: 30,
    },
    {
      key: '40',
      value: 40,
    },
    {
      key: '50',
      value: 50,
    },
  ],
  status: [
    {
      key: 1,
      value: 'New',
    },
    {
      key: 2,
      value: 'Responded',
    },
    {
      key: 3,
      value: 'Nurturing',
    },
    {
      key: 4,
      value: 'Working',
    },
    {
      key: 5,
      value: 'Past Client',
    },
  ],
  currentCompany: [
    {
      key: 1,
      value: 'New',
    },
    {
      key: 2,
      value: 'Responded',
    },
    {
      key: 3,
      value: 'Nurturing',
    },
    {
      key: 4,
      value: 'Working',
    },
    {
      key: 5,
      value: 'Past Client',
    },
  ],
  leadSource: [
    {
      key: 1,
      value: 'Self Sourced',
    },
    {
      key: 2,
      value: 'Bankrate',
    },
    {
      key: 3,
      value: 'LendingTree',
    },
    {
      key: 4,
      value: 'Past Client Referral',
    },
    {
      key: 5,
      value: 'Company Website',
    },
    {
      key: 6,
      value: 'CBH Homes',
    },
    {
      key: 7,
      value: 'Agent Referral',
    },
    {
      key: 8,
      value: 'Boise Hunter Homes',
    },
    {
      key: 9,
      value: 'Bauscher Real Estate',
    },
    {
      key: 10,
      value: 'McFerrin Real Estate',
    },
    {
      key: 11,
      value: 'Templeton Real Estate',
    },
  ],
  isVaEligible: [
    {
      key: 1,
      value: 'Yes',
    },
    {
      key: 2,
      value: 'No',
    },
  ],
  amortizationType: [
    {
      key: 1,
      value: 'Fixed',
    },
    {
      key: 2,
      value: 'Adjustable',
    },
  ],
  propertyType: [
    {
      key: 1,
      value: 'Single Family',
    },
    {
      key: 2,
      value: 'Townhome',
    },
    {
      key: 3,
      value: 'Condo',
    },
  ],
  propertyUse: [
    {
      key: 1,
      value: 'Primary Residence',
    },
    {
      key: 2,
      value: 'Second Home',
    },
    {
      key: 3,
      value: 'Investment',
    },
  ],
  loanTag: [
    {
      key: 1,
      value: 'Application Intaket',
    },
    {
      key: 2,
      value: 'Pre-Qualification',
    },
    {
      key: 3,
      value: 'Pre-Approved',
    },
    {
      key: 4,
      value: 'Loan Setup',
    },
    {
      key: 5,
      value: 'Disclosures Sent',
    },
    {
      key: 6,
      value: 'In Underwriting',
    },
    {
      key: 7,
      value: 'Conditionally Approved',
    },
    {
      key: 8,
      value: 'Re-submitted',
    },
    {
      key: 9,
      value: 'Clear to Close',
    },
    {
      key: 10,
      value: 'Docs out',
    },
    {
      key: 11,
      value: 'Docs Signed',
    },
    {
      key: 12,
      value: 'Loan Funded',
    },
    {
      key: 13,
      value: 'Broker Check Recieved',
    },
    {
      key: 14,
      value: 'Commission Paid',
    },
    {
      key: 15,
      value: 'Adverse',
    },
  ],
  campaign: [
    {
      key: 1,
      value: 'Application Intaket',
    },
    {
      key: 2,
      value: 'Pre-Qualification',
    },
    {
      key: 3,
      value: 'Pre-Approved',
    },
    {
      key: 4,
      value: 'Loan Setup',
    },
    {
      key: 5,
      value: 'Disclosures Sent',
    },
    {
      key: 6,
      value: 'In Underwriting',
    },
    {
      key: 7,
      value: 'Conditionally Approved',
    },
    {
      key: 8,
      value: 'Re-submitted',
    },
    {
      key: 9,
      value: 'Clear to Close',
    },
    {
      key: 10,
      value: 'Docs out',
    },
    {
      key: 11,
      value: 'Docs Signed',
    },
    {
      key: 12,
      value: 'Loan Funded',
    },
    {
      key: 13,
      value: 'Broker Check Recieved',
    },
    {
      key: 14,
      value: 'Commission Paid',
    },
    {
      key: 15,
      value: 'Adverse',
    },
    {
      key: 16,
      value: 'Adaptive dynamic complexity',
    },
  ],
  builderCompany: [
    {
      key: 1,
      value: 'Application Intaket',
    },
    {
      key: 2,
      value: 'Pre-Qualification',
    },
    {
      key: 3,
      value: 'Pre-Approved',
    },
    {
      key: 4,
      value: 'Loan Setup',
    },
    {
      key: 5,
      value: 'Disclosures Sent',
    },
    {
      key: 6,
      value: 'In Underwriting',
    },
    {
      key: 7,
      value: 'Conditionally Approved',
    },
    {
      key: 8,
      value: 'Re-submitted',
    },
    {
      key: 9,
      value: 'Clear to Close',
    },
    {
      key: 10,
      value: 'Docs out',
    },
    {
      key: 11,
      value: 'Docs Signed',
    },
    {
      key: 12,
      value: 'Loan Funded',
    },
    {
      key: 13,
      value: 'Broker Check Recieved',
    },
    {
      key: 14,
      value: 'Commission Paid',
    },
    {
      key: 15,
      value: 'Adverse',
    },
  ],
  units: [
    {
      key: 1,
      value: 'Application Intaket',
    },
    {
      key: 2,
      value: 'Pre-Qualification',
    },
    {
      key: 3,
      value: 'Pre-Approved',
    },
    {
      key: 4,
      value: 'Loan Setup',
    },
    {
      key: 5,
      value: 'Disclosures Sent',
    },
    {
      key: 6,
      value: 'In Underwriting',
    },
    {
      key: 7,
      value: 'Conditionally Approved',
    },
    {
      key: 8,
      value: 'Re-submitted',
    },
    {
      key: 9,
      value: 'Clear to Close',
    },
    {
      key: 10,
      value: 'Docs out',
    },
    {
      key: 11,
      value: 'Docs Signed',
    },
    {
      key: 12,
      value: 'Loan Funded',
    },
    {
      key: 13,
      value: 'Broker Check Recieved',
    },
    {
      key: 14,
      value: 'Commission Paid',
    },
    {
      key: 15,
      value: 'Adverse',
    },
  ],

  getSetting(prop, condition) {
    const object = _.find(this[prop], {
      key: condition,
    });

    return object ? object.value : '';
  },
};
