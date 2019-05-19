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

/**
 * Claims by collector id
 * @param collectorId
 * @param cb
 */
export const apiGetClaims = (collectorId, cb) => {
    const url = `${apiUrl}/claims/search?collectorsId=${collectorId}`;
    console.log(url);
    // cb([{
    //     id: 1,
    //     createdDttm: new Date('2019-05-18 23:00:00'),
    //     citizenId: 1,
    //     citizenLogin: 'vasya',
    //     garbageType: 'glass',
    //     address: 'some address'
    // }, {
    //     id: 2,
    //     createdDttm: new Date('2019-05-18 23:24:12'),
    //     citizenId: 2,
    //     citizenLogin: 'kolya',
    //     garbageType: 'plastic',
    // }, {
    //     id: 3,
    //     createdDttm: new Date('2019-05-17 12:44:13'),
    //     citizenId: 3,
    //     citizenLogin: 'petya',
    //     garbageType: 'wood',
    //     address: 'some address 2'
    // }]);
    // return;

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
    // cb();
    // return;

    axios.post(url, {
        garbage_type: garbageType,
        params: {
            address: `Екатеринбург, Ленина ${Math.floor(Math.random() * Math.floor(100))}`
        }
        // weight: weight
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
    // console.log(url);
    // cb([
    //     {id: 1, login: 'vasya'},
    //     {id: 2, login: 'kolya'},
    //     {id: 3, login: 'petya'},
    // ]);
    // return;

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
    // cb([
    //     {id: 1, name: 'collector1', garbageType: 'glass', address: 'collector address 1'},
    //     {id: 2, name: 'collector2', garbageType: 'plastic', address: 'collector address 2'},
    //     {id: 3, name: 'collector3', garbageType: 'clothes', address: 'collector address 3'},
    // ]);
    // return;

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
    // const res = ['glass', 'plastic', 'clothes', 'metal', 'wood'];
    // const mapGarbageTypes = {
    //     glass: 'Стекло',
    //     plastic: 'Пластик',
    //     clothes: 'Одежда/тряпки',
    //     metal: 'Металл',
    //     wood: 'Дерево',
    // };
    // const types = res.map(type => ({
    //     id: type,
    //     title: (mapGarbageTypes.hasOwnProperty(type) ? mapGarbageTypes[type] : type)
    // }));
    // cb(types);
    // return;

    axios.get(url)
        .then(res => {
            console.log(res);
            cb(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};
