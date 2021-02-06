const mikesBirthday = new Date('2020-12-08T00:00:00.000Z');
const mikeBirthdayUnixTimestamp = 439689600;

global.Date = class extends Date {
  constructor(date) {
    if (date) {
      return super(date);
    }

    return mikesBirthday;
  }
};

global.Date.now = function () {
  return mikeBirthdayUnixTimestamp;
};
