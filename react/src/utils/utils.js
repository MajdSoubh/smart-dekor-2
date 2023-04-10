import _ from "lodash";

export function mapDataToState(stateData, updatedData) {
    if (Array.isArray(stateData)) {
        const data = [];
        _.forEach(updatedData, (resItem) => {
            const tempItem = {};
            for (const key in stateData[0]) {
                tempItem[key] = resItem[key] ? resItem[key] : stateData[0][key];
            }
            data.push(tempItem);
        });
        return data;
    } else {
        const data = {};
        for (const key in stateData) {
            data[key] = updatedData[key] ? updatedData[key] : stateData[key];
        }
        return data;
    }
}
