export enum RegistrationStatus {
  PENDING   = 'pending',
  CONFIRM   = 'confirm',
  SHORTLIST = 'shortlist',
  REJECT    = 'reject',
  CHECK_IN  = 'check-in',
}

/** Statuses that were used in the old DB schema — kept for backward compat */
export enum LegacyRegistrationStatus {
  SHORTLISTED = 'shortlisted',
  ATTENDED    = 'attended',
  REJECTED    = 'rejected',
}
