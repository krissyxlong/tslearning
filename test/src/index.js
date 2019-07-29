
const func = (arr) => {
    const result = [];
    let {
        startDate: lastStartDate, endDate: lastEndDate, startTime: lastStartTime, endTime: lastEndTime
    } = arr.shift();

    while (arr.length > 0) {
        const {
            startDate,
            endDate,
            startTime,
            endTime
        } = arr.shift();

        if (startDate === lastStartDate && endDate === lastEndDate && startTime - lastEndTime === 1) { // 符合融合条件
            lastEndTime = endTime; // 结束时间后移
            continue;
        }

        // 不符合
        result.push({
            lastStartDate,
            lastEndDate,
            lastEndTime,
            lastStartTime
        });
        lastStartDate = startDate;
        lastEndDate = endDate;
        lastEndTime = endTime;
        lastStartTime = startTime;
    }


    if (lastStartDate) {
        result.push({
            lastStartDate,
            lastEndDate,
            lastEndTime,
            lastStartTime
        });
    }
    return result;
}

func([
    {
        startTime: 1,
        endTime: 2,
        startDate: 1,
        endDate: 2
    },
    {
        startTime: 3,
        endTime: 4,
        startDate: 1,
        endDate: 2
    },
    {
        startTime: 1,
        endTime: 2,
        startDate: 6,
        endDate: 7
    },
    {
        startTime: 3,
        endTime: 5,
        startDate: 6,
        endDate: 7
    }
]);

console.log('11111111111:', result);
