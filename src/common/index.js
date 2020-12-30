const acceptMilestoneHash = [
  1437935813,
  1942283261,
  3312774044,
];

const hashProperty = {
  // 실각한 자
  2136458564: null, // adept
  2136458567: {
    arc: 24,
    void: 2,
    solar: 6,
    barrier: 8,
    overload: 0,
    unstoppable: 2,
    description: '',
  }, // hero
  2136458566: {
    arc: 24,
    void: 2,
    solar: 6,
    barrier: 8,
    overload: 0,
    unstoppable: 2,
    description: '',
  }, // legend
  2136458561: {
    arc: 20,
    void: 0,
    solar: 6,
    barrier: 16,
    overload: 0,
    unstoppable: 3,
    description: '',
  }, // master
  2136458560: {
    arc: 20,
    void: 0,
    solar: 6,
    barrier: 16,
    overload: 0,
    unstoppable: 3,
    description: '',
  }, // grandmaster
  // 무기거래상
  1753547897: null,
  1753547898: null,
  1753547899: null,
  1753547900: null,
  1753547901: null,
  // 유리길
  3812135455: null,
  3812135452: {
    arc: 12,
    void: 5,
    solar: 1,
    barrier: 7,
    overload: 7,
    unstoppable: 0,
    description: '',
  },
  3812135453: {
    arc: 12,
    void: 5,
    solar: 1,
    barrier: 7,
    overload: 7,
    unstoppable: 0,
    description: '',
  },
  3812135450: {
    arc: 8,
    void: 0,
    solar: 2,
    barrier: 12,
    overload: 16,
    unstoppable: 0,
    description: '',
  },
  3812135451: {
    arc: 8,
    void: 0,
    solar: 2,
    barrier: 12,
    overload: 16,
    unstoppable: 0,
    description: '',
  },
  // 진홍빛 요새
  1495545952: null,
  1495545955: {
    arc: 20,
    void: 0,
    solar: 16,
    barrier: 7,
    overload: 0,
    unstoppable: 3,
    description: '',
  },
  1495545954: {
    arc: 20,
    void: 0,
    solar: 16,
    barrier: 7,
    overload: 0,
    unstoppable: 3,
    description: '',
  },
  1495545957: {
    arc: 11,
    void: 0,
    solar: 16,
    barrier: 16,
    overload: 0,
    unstoppable: 4,
    description: '',
  },
  1495545956: {
    arc: 11,
    void: 0,
    solar: 16,
    barrier: 16,
    overload: 0,
    unstoppable: 4,
    description: '',
  },
  // 통찰의 종착지
  3029388708: null,
  3029388711: null,
  3029388710: null,
  3029388705: null,
  3029388704: null,
  // 뒤집어진 첨탑
  2599001915: null,
  2599001912: {
    arc: 26,
    void: 13,
    solar: 3,
    barrier: 7,
    overload: 0,
    unstoppable: 6,
    description: '',
  },
  2599001913: {
    arc: 26,
    void: 13,
    solar: 3,
    barrier: 7,
    overload: 0,
    unstoppable: 6,
    description: '',
  },
  2599001918: {
    arc: 26,
    void: 10,
    solar: 3,
    barrier: 12,
    overload: 0,
    unstoppable: 7,
    description: '',
  },
  2599001919: {
    arc: 26,
    void: 10,
    solar: 3,
    barrier: 12,
    overload: 0,
    unstoppable: 7,
    description: '',
  },
  // 엑소더스의 추락
  3233498450: null,
  3233498449: {
    arc: 0,
    void: 1,
    solar: 5,
    barrier: 2,
    overload: 9,
    unstoppable: 0,
    description: '',
  },
  3233498448: {
    arc: 0,
    void: 1,
    solar: 5,
    barrier: 2,
    overload: 9,
    unstoppable: 0,
    description: '',
  },
  3233498455: {
    arc: 0,
    void: 0,
    solar: 5,
    barrier: 5,
    overload: 13,
    unstoppable: 0,
    description: '',
  },
  3233498454: {
    arc: 0,
    void: 0,
    solar: 5,
    barrier: 5,
    overload: 13,
    unstoppable: 0,
    description: '',
  },
  // 벌레소굴
  265186829: null,
  265186830: {
    arc: 11,
    void: 0,
    solar: 4,
    barrier: 9,
    overload: 0,
    unstoppable: 3,
    description: '',
  },
  265186831: {
    arc: 11,
    void: 0,
    solar: 4,
    barrier: 9,
    overload: 0,
    unstoppable: 3,
    description: '',
  },
  265186824: {
    arc: 7,
    void: 0,
    solar: 2,
    barrier: 13,
    overload: 0,
    unstoppable: 7,
    description: '',
  },
  265186825: {
    arc: 7,
    void: 0,
    solar: 2,
    barrier: 13,
    overload: 0,
    unstoppable: 7,
    description: '',
  },
  // 무의 감시관
  557845330: null,
  557845329: null,
  557845328: null,
  557845335: null,
  557845334: null,
};

const isRefreshLocalStorage = (timestamp) => {
  const currentTimestamp = new Date();
  const currentDateTime = {
    date: currentTimestamp.getDate(),
    hour: currentTimestamp.getHours(),
    min: currentTimestamp.getMinutes(),
    ms: currentTimestamp.getTime(),
    totalMin: currentTimestamp.getHours() * 60 + currentTimestamp.getMinutes(),
  };
  const targetDateTime = {
    date: timestamp.getDate(),
    hour: timestamp.getHours(),
    min: timestamp.getMinutes(),
    ms: timestamp.getTime(),
    totalMin: timestamp.getHours() * 60 + timestamp.getMinutes(),
  };
  if (currentDateTime.ms - targetDateTime.ms > 86400000) {
    return true;
  }
  if (currentDateTime.date !== targetDateTime.date) {
    return true;
  }
  if (currentDateTime.hour > 2 && targetDateTime.hour < 2) {
    return true;
  }
  if (currentDateTime.totalMin > 150 && targetDateTime.totalMin <= 150) {
    return true;
  }
  return false;
};

const lpad = (num) => {
  if (num >= 10) {
    return num;
  }
  return `0${num}`;
};

const getFormatDate = (date) => {
  if (!date) return null;
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
  acceptMilestoneHash,
  hashProperty,
  isRefreshLocalStorage,
  getFormatDate,
  weeklyDateRange,
};
