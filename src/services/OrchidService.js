import mongoose from "mongoose";
import Orchids from '../models/Orchids'

export const getAllOrchids = async () => {
    const url = process.env.URL_DB;
    const connect = mongoose.connect(url, { family: 4 });
    let arrOrchids = [];

    arrOrchids = connect.then(() => {
        console.log('Connected correctly to server');
        return Orchids.find({})
            .then(async (orchids) => {
                await mongoose.disconnect();
                return orchids;
            })
            .catch((err) => {
                console.log(err);
                arrOrchids = [];
            });
    });

    return arrOrchids;
}
function isNumber(str) {
    // Sử dụng hàm isNaN để kiểm tra xem giá trị của chuỗi có phải là số hay không
    // Đồng thời sử dụng hàm trim để loại bỏ các khoảng trắng từ đầu và cuối chuỗi
    return !isNaN(parseFloat(str)) && isFinite(str.trim());
}

export const createOrchid = async (newOrchid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let error = {}
            let isError = false
            // let arr = await getAllOrchids();
            if (newOrchid.name === '' || newOrchid.name === undefined) {
                error.isEmptyName = 'Name cannot be empty';
                isError = true;
            }
            if (newOrchid.image === '' || newOrchid.image === undefined) {
                error.isEmptyImg = 'Image cannot be empty';
                isError = true;
            }
            if (newOrchid.price === '' || newOrchid.price === undefined) {
                error.isEmptyPrice = 'Price cannot be empty';
                isError = true;
            } else {
                if (!isNumber(newOrchid.price)) {
                    error.invalidPrice = 'Price must be a number';
                    isError = true;
                }
            }
            if (newOrchid.original === '' || newOrchid.original === undefined) {
                error.isEmptyOriginal = 'Original cannot be empty';
                isError = true;
            }
            if (newOrchid.isNatural === '' || newOrchid.isNatural === undefined) {
                error.isEmptyNatural = 'Natural cannot be empty';
                isError = true;
            } else {
                if (newOrchid.isNatural !== 'true' && newOrchid.isNatural !== 'false') {
                    error.isEmptyNatural = `Natural must be 'true' or 'false'`;
                    isError = true;
                }
            }
            if (newOrchid.color === '' || newOrchid.color === undefined) {
                error.isEmptyColor = 'Color cannot be empty';
                isError = true;
            }
            if (isError) {
                resolve({
                    error: error,
                    // arrOrchids: arr
                })
            }
            let isExist = await checkOrchidName(newOrchid.name);
            if (isExist) {
                error.isDup = 'Name Duplicated';
                isError = true;
                resolve({
                    error: error,
                    // arrOrchids: arr
                })
            }
            if (!isError) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Orchids({ name: newOrchid.name, image: newOrchid.image, price: newOrchid.price, original: newOrchid.original, isNatural: newOrchid.isNatural === 'true' ? true : false, color: newOrchid.color }).save()
                        .then(async (orc) => {
                            if (orc) {
                                // arr = await getAllOrchids();
                                await mongoose.disconnect();
                                resolve({
                                    // arrOrchids: arr,
                                    data: orc,
                                    isSuccess: true
                                });
                            } else {
                                error.createfailed = 'Something wrong';
                                await mongoose.disconnect();
                                resolve({
                                    error: error,
                                    // arrOrchids: arr
                                })
                            }
                        });
                })
            }
        } catch (error) {
            await mongoose.disconnect();
            resolve(error);
        }
    })
}

let checkOrchidName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = process.env.URL_DB;
            const connect = mongoose.connect(url, { family: 4 });
            connect.then(() => {
                Orchids.findOne({ name: name })
                    .then(async (orchid) => {
                        if (orchid) {
                            await mongoose.disconnect();
                            resolve(true);
                        } else {
                            await mongoose.disconnect();
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        resolve(false);
                    });
            })
        } catch (error) {
            console.log('Catch error: ', error);
            resolve(false);
        }
    })
}

let checkOrchidById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id !== '' && id !== undefined) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Orchids.findOne({ _id: id })
                        .then((orchid) => {
                            mongoose.disconnect().then(() => {
                                if (orchid) {
                                    resolve(true);
                                }
                                resolve(false);
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            resolve(false);
                        });
                })
            } else {
                resolve(false);
            }
        } catch (error) {
            resolve(error)
        }
    })
}

export const updateOrc = async (orc) => {
    return new Promise(async (resolve, reject) => {
        try {
            let error = {}
            let isError = false;
            let isExist = false;
            // let arr = await getAllOrchids();
            if (orc.id === '' || orc.id === undefined) {
                error.invalidId = "Required Id";
                isError = true;
                return resolve({
                    errorUpdate: error
                });
            } else {
                isExist = await checkOrchidById(orc.id);
            }
            if (isExist) {
                if (orc.name === '' || orc.name === undefined) {
                    error.isEmptyName = 'Name cannot be empty';
                    isError = true;
                }
                if (orc.image === '' || orc.image === undefined) {
                    error.isEmptyImg = 'Image URL cannot be empty';
                    isError = true;
                }
                if (orc.price === '' || orc.price === undefined) {
                    error.isEmptyPrice = 'Price cannot be empty';
                    isError = true;
                } else {
                    if (!isNumber(orc.price)) {
                        error.invalidPrice = 'Price must be a number';
                        isError = true;
                    }
                }
                if (orc.original === '' || orc.original === undefined) {
                    error.isEmptyOriginal = 'Original cannot be empty';
                    isError = true;
                }
                if (orc.isNatural === '' || orc.isNatural === undefined) {
                    error.isEmptyNatural = 'Natural cannot be empty';
                    isError = true;
                }
                if (orc.color === '' || orc.color === undefined) {
                    error.isEmptyColor = 'Color cannot be empty';
                    isError = true;
                }
                if (isError) {
                    return resolve({
                        errorUpdate: error,
                        // arrOrchids: arr
                    })
                }
                isExist = await checkOrchidName(orc.name);
                if (isExist) {
                    if (orc.name !== orc.currentName) {
                        error.isDup = 'Name Duplicated';
                        isError = true;
                        return resolve({
                            errorUpdate: error,
                            // arrOrchids: arr
                        })
                    }
                }
            } else {
                error.invalidId = "Id doesn't exist.";
                isError = true;
                return resolve({
                    errorUpdate: error,
                    // arrCategories: arr
                })
            }
            if (!isError) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Orchids.updateOne({ _id: orc.id }, { $set: { name: orc.name, image: orc.image, price: orc.price, original: orc.original, isNatural: orc.isNatural === 'true' ? true : false, color: orc.color } })
                        .then(async (isUpdated) => {
                            if (isUpdated.modifiedCount >= 1) {
                                // arr = await getAllOrchids();
                                await mongoose.disconnect();
                                return resolve({
                                    // arrOrchids: arr,
                                    data: isUpdated,
                                    isUpdate: true
                                });
                            } else {
                                error.createfailed = 'Something wrong';
                                await mongoose.disconnect();
                                return resolve({
                                    errorUpdate: error,
                                    // arrOrchids: arr
                                })
                            }
                        });
                })
            }
        } catch (error) {
            console.log('Something wrong: ', error)
            resolve(error);
        }
    })
}

export const deleteOrchidById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const error = {}
            // let arrOrchids = await getAllOrchids();
            const isExist = await checkOrchidById(id);
            if (isExist) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Orchids.deleteOne({ "_id": id })
                        .then(async (category) => {
                            // arrOrchids = await getAllOrchids();
                            await mongoose.disconnect();
                            resolve(
                                {
                                    data: category,
                                    deleteSuccess: true,
                                    // arrOrchids: arrOrchids
                                }
                            )
                            return category;
                        })
                        .catch(async (err) => {
                            console.log('error check: ', err);
                            error.dbError = 'Something wrong with DB';
                            await mongoose.disconnect();
                            resolve(
                                {
                                    error: error,
                                    // arrOrchids: arrOrchids
                                }
                            )
                        });
                })
            } else {
                error.missingId = 'Missing Id or wrong Id'
                resolve(
                    {
                        error: error,
                        // arrOrchids: arrOrchids
                    }
                )
            }
        } catch (error) {
            resolve(error)
        }
    })
}