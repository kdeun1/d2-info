const defaultFn = () => {};

const acceptMilestoneHash = [
  1437935813,
  1942283261,
  3312774044,
];

const lpad = (num) => {
  if (num >= 10) {
    return num;
  }
  return `0${num}`;
};

const getFormatDate = (date) => {
  const year = date.getFullYear();
  const month = lpad(1 + date.getMonth());
  const day = lpad(date.getDate());
  const hour = lpad(date.getHours());
  const min = lpad(date.getMinutes());
  const sec = lpad(date.getSeconds());
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${min}분 ${sec}초`;
};

const weeklyDateRange = (date) => {
  const ONE_DAY_MS = 86400000;
  const currentDateTime = date.getTime();
  const dayOfTheWeek = date.getDay(); // 0:일 ~ 6:토
  let fromFirstDate;
  switch (dayOfTheWeek) {
    case 4:
      fromFirstDate = -1;
      break;
    case 5:
      fromFirstDate = -2;
      break;
    case 6:
      fromFirstDate = -3;
      break;
    case 0:
      fromFirstDate = -4;
      break;
    case 1:
      fromFirstDate = -5;
      break;
    case 2:
      fromFirstDate = -6;
      break;
    default: // 3
      fromFirstDate = 0;
      break;
  }
  const fromDateMs = currentDateTime + (ONE_DAY_MS * fromFirstDate);
  const toDateMs = fromDateMs + (ONE_DAY_MS * 7);
  const fromDateYmd = {
    year: new Date(fromDateMs).getFullYear(),
    month: lpad(1 + new Date(fromDateMs).getMonth()),
    date: lpad(new Date(fromDateMs).getDate()),
  };
  const toDateYmd = {
    year: new Date(toDateMs).getFullYear(),
    month: lpad(1 + new Date(toDateMs).getMonth()),
    date: lpad(new Date(toDateMs).getDate()),
  };
  return `${fromDateYmd.year}-${fromDateYmd.month}-${fromDateYmd.date}(수) ~ ${toDateYmd.year}-${toDateYmd.month}-${toDateYmd.date}(화)`;
};

export {
  defaultFn,
  acceptMilestoneHash,
  getFormatDate,
  weeklyDateRange,
};
