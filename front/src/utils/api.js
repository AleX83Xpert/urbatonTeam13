import axios from 'axios';

const apiUrl = 'http://hacathon.liinda.ru:8082';
// const apiUrl = 'http://localhost:8082';

export const apiLogin = (login, password, cb) => {
    const url = `${apiUrl}/login/`;
    console.log(url);
    axios.post(url, {
        login: login,
        password: password
    }, {withCredentials: true}).then(res => {
        console.log(res);
        const {data} = res;
        cb(data.id, data.role);
    }).catch(err => {
    });
};

export const apiSignUp = (login, password, cb) => {
    const url = `${apiUrl}/citizens/`;
    console.log(url);
    axios.post(url, {
        login: login,
        password: password
    }, {withCredentials: true}).then(res => {
        console.log(res);
        const {data} = res;
        cb(data.id, data.role);
    }).catch(err => {
    });
};

/**
 * Claims by collector id
 * @param collectorId
 * @param cb
 */
export const apiGetClaims = (collectorId, cb) => {
    const url = `${apiUrl}/claims/search?collectorsId=${collectorId}`;
    console.log(url);

    axios.get(url, {withCredentials: true})
        .then(res => {
            console.log(res);
            cb(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

export const apiAcceptGarbage = (collectorId, citizenId, garbageType, weight, cb) => {
    const url = `${apiUrl}/claims/${collectorId}/${citizenId}`;
    console.log(url);

    axios.post(url, {
        garbage_type: garbageType,
        params: {
            address: `Екатеринбург, Ленина ${Math.floor(Math.random() * Math.floor(100))}`
        }
    })
        .then(res => {
            cb(res.data);
        })
        .catch(err => {
        });
};

export const apiEditClaim = (claimId, claimState, measurementUnit, amount, cb) => {
    const url = `${apiUrl}/claims/${claimId}/${claimState}`;
    console.log(url);

    axios.put(url, {
        measurementUnit, amount
    })
        .then(res => {
            cb(res.data);
        })
        .catch(err => {
        });
};

export const apiGetCitizens = (search, cb) => {
    const url = `${apiUrl}/citizens/search?login=${search}`;
    axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(err => {
        });
};

export const apiGetCollectors = (garbageType, cb) => {
    const url = `${apiUrl}/collectors/search?garbageType=${garbageType}`;
    console.log(url);
    axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(err => {
        });
};

export const apiGetGarbageTypes = (cb) => {
    const url = `${apiUrl}/garbages/types`;
    console.log(url);
    axios.get(url)
        .then(res => {
            console.log(res);
            cb(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};
