/* Motion constants and the auto-play sequence for the OTP pill.
   Widths in px, durations in seconds, delays for setTimeout in ms. */
export const OTP_MOTION = {
  expandedWidth: 374,
  compactWidth: 202,
  verifiedWidth: 174,
  openDuration: 0.58,
  collapseDuration: 0.42,
  focusDuration: 0.2,
  verifyDelay: 1550,
  errorDuration: 680,
  ease: 'back.out(1.15)',
};

/* [elapsed-ms, code-so-far] pairs: a failing attempt (213212), then the
   correct one (123456). */
export const OTP_REPLAY = [
  [1000, '2'],
  [1250, '21'],
  [1500, '213'],
  [1750, '2132'],
  [2000, '21321'],
  [2250, '213212'],
  [4850, '1'],
  [5100, '12'],
  [5350, '123'],
  [5600, '1234'],
  [5850, '12345'],
  [6100, '123456'],
];
