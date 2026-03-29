/** Mirrors RegistrationStatus enum in backend/src/common/enums/registration-status.enum.ts */
export const RegistrationStatus = Object.freeze({
  PENDING:   'pending',
  CONFIRM:   'confirm',
  SHORTLIST: 'shortlist',
  REJECT:    'reject',
  CHECK_IN:  'check-in',
});

/** Old DB values — kept for backward-compat display only */
export const LegacyRegistrationStatus = Object.freeze({
  SHORTLISTED: 'shortlisted',
  ATTENDED:    'attended',
  REJECTED:    'rejected',
});

export const STATUS_LABELS = {
  [RegistrationStatus.PENDING]:             'Pending',
  [RegistrationStatus.CONFIRM]:             'Confirm',
  [RegistrationStatus.SHORTLIST]:           'Shortlist',
  [RegistrationStatus.REJECT]:              'Reject',
  [RegistrationStatus.CHECK_IN]:            'Check-in',
  [LegacyRegistrationStatus.SHORTLISTED]:   'Shortlisted',
  [LegacyRegistrationStatus.ATTENDED]:      'Attended',
  [LegacyRegistrationStatus.REJECTED]:      'Rejected',
};

export const STATUS_COLORS = {
  [RegistrationStatus.PENDING]:             'bg-yellow-100 text-amber-600',
  [RegistrationStatus.CONFIRM]:             'bg-blue-100 text-gdg-blue',
  [RegistrationStatus.SHORTLIST]:           'bg-purple-100 text-purple-700',
  [RegistrationStatus.REJECT]:              'bg-red-100 text-gdg-red',
  [RegistrationStatus.CHECK_IN]:            'bg-green-100 text-gdg-green',
  // legacy
  [LegacyRegistrationStatus.SHORTLISTED]:   'bg-purple-100 text-purple-700',
  [LegacyRegistrationStatus.ATTENDED]:      'bg-green-100 text-gdg-green',
  [LegacyRegistrationStatus.REJECTED]:      'bg-red-100 text-gdg-red',
};

export const STATUS_BUTTON_COLORS = {
  [RegistrationStatus.CONFIRM]:   'bg-gdg-blue text-white hover:bg-blue-600',
  [RegistrationStatus.SHORTLIST]: 'bg-purple-600 text-white hover:bg-purple-700',
  [RegistrationStatus.CHECK_IN]:  'bg-gdg-green text-white hover:bg-green-600',
  [RegistrationStatus.REJECT]:    'bg-gdg-red text-white hover:bg-red-600',
};

export const STATUS_TRANSITIONS = {
  [RegistrationStatus.PENDING]:   [RegistrationStatus.CONFIRM, RegistrationStatus.SHORTLIST, RegistrationStatus.REJECT],
  [RegistrationStatus.CONFIRM]:   [RegistrationStatus.CHECK_IN],
  [RegistrationStatus.SHORTLIST]: [RegistrationStatus.CHECK_IN, RegistrationStatus.REJECT],
  // legacy
  [LegacyRegistrationStatus.SHORTLISTED]: [RegistrationStatus.CHECK_IN, RegistrationStatus.REJECT],
};

/** Statuses shown as buttons in the bulk-action bar */
export const BULK_STATUSES = [
  RegistrationStatus.CONFIRM,
  RegistrationStatus.SHORTLIST,
  RegistrationStatus.REJECT,
  RegistrationStatus.CHECK_IN,
];

/** Options for the Status filter dropdown */
export const STATUS_FILTER_OPTIONS = [
  { value: RegistrationStatus.PENDING,   label: 'Pending'   },
  { value: RegistrationStatus.CONFIRM,   label: 'Confirm'   },
  { value: RegistrationStatus.SHORTLIST, label: 'Shortlist' },
  { value: RegistrationStatus.REJECT,    label: 'Reject'    },
  { value: RegistrationStatus.CHECK_IN,  label: 'Check-in'  },
];
