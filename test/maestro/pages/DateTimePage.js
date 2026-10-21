output.DateTimePage = {
  page: 'DateTime_Page',
  resetSelectionLink: 'DateTime_ResetSelectionLink',
  continueButton: 'DateTime_ContinueButton',
  selectButton: (index) => `DateTime_Product${index}_SelectButton`,
  confirmedDate: (index) => `DateTime_Product${index}_ConfirmedDate`,
  // Debug buttons
  setForceOpenButton: 'Debug_SetForceOpenButton',
  setLiveButton: 'Debug_SetLiveButton',
  setForceClosedButton: 'Debug_SetForceClosedButton',
  // Calendar Dialog
  calendarDialog: 'Calendar_Dialog',
  nextMonthButton: 'Calendar_NextMonthButton',
  calendarSaveButton: 'Calendar_SaveButton',
  calendarDay: (day) => `Calendar_Day${day}`,
  // Timeslot Dialog
  timeslotDialog: 'Timeslot_Dialog',
  timeslotSaveButton: 'Timeslot_SaveButton',
  timeslotSlot: (slot) => `Timeslot_Slot_${slot}`,
};
