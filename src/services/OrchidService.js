const mongoose = require('mongoose');
const Orchids = require('../models/Orchids');

class orchidServices {
    async getOrchidsByPage(pageReq) {
        try {
            let data = {
                orchidsArr: [],
                page: 1,
                totalPages: 1,
                itemsPerPage: 10,
            };
            data.itemsPerPage = 10;
            // Parse query parameters
            data.page = parseInt(pageReq) || 1;

            // Calculate start and end indices for the current page
            const startIndex = (data.page - 1) * data.itemsPerPage;

            const url = process.env.URL_DB;
            await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
            const totalCount = await Orchids.countDocuments({});

            data.totalPages = Math.ceil(totalCount / data.itemsPerPage);

            data.orchidsArr = await Orchids.find({})
                .populate('category')
                .skip(startIndex).limit(data.itemsPerPage)
            // .select('name imgURL price materials colors')
            // .populate({
            //     path: "materials",
            //     select: 'name',
            // })
            // .populate({
            //     path: "colors",
            //     select: 'name',
            // })
            return {
                status: 200,
                data: data,
                message: data.length !== 0 ? "OK" : "No data"
            };
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                messageError: error,
            }
        } finally {
            // Close the database connection
            mongoose.connection.close();
        }
    }

    async getOrchidById(id) {
        try {
            let data = {}
            const idValid = await isIdValid(id, 'orchid');
            if (!idValid.isValid) {
                return {
                    status: idValid.status,
                    data: {},
                    messageError: idValid.messageError
                }
            }

            const url = process.env.URL_DB;
            await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
            try {

                data = await Orchids.findById(id)
                    .populate({
                        path: 'category',
                        select: 'categoryName'
                    })
                    .populate('comments.author')
                // if (data && data?.comments.length) {
                //     console.log('hehe');
                // }
            } catch (error) {
                console.log('err: ', error);
            }

            if (data) {
                return {
                    status: 200,
                    data: data,
                    message: "OK"
                };
            } else {
                return {
                    status: 200,
                    data: {},
                    message: "No data"
                }
            }
        } catch (error) {
            return {
                status: 500,
                messageError: error,
            }
        } finally {
            // Close the database connection
            mongoose.connection.close();
        }
    }

    async getOrchidByName(name, pageReq) {
        try {
            let data = {
                orchidsArr: [],
                page: 1,
                totalPages: 1,
                itemsPerPage: 10,
            };
            data.itemsPerPage = 10;
            // Parse query parameters
            data.page = parseInt(pageReq) || 1;
            const regex = new RegExp(name, "i");

            // Calculate start and end indices for the current page
            const startIndex = (data.page - 1) * data.itemsPerPage;

            const url = process.env.URL_DB;
            await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
            try {

                data.orchidsArr = await Orchids.find({ name: { $regex: regex } })
                    .populate('category')
                    .skip(startIndex).limit(data.itemsPerPage);

                data.totalPages = Math.ceil(data.orchidsArr.length / data.itemsPerPage);

            } catch (error) {
                console.log('err: ', error);
            }

            if (data) {
                return {
                    status: 200,
                    data: data,
                    message: "OK"
                };
            } else {
                return {
                    status: 200,
                    data: {},
                    message: "No data"
                }
            }
        } catch (error) {
            return {
                status: 500,
                messageError: error,
            }
        } finally {
            // Close the database connection
            mongoose.connection.close();
        }
    }

    async createOrchid(newOrchid) {
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

    async updateOrc(orc) {
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

    async deleteOrchidById(id) {
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
}

function isNumber(str) {
    // Sử dụng hàm isNaN để kiểm tra xem giá trị của chuỗi có phải là số hay không
    // Đồng thời sử dụng hàm trim để loại bỏ các khoảng trắng từ đầu và cuối chuỗi
    return !isNaN(parseFloat(str)) && isFinite(str.trim());
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

async function isIdValid(id, model) {
    if (id === null || id === undefined) {
        return {
            status: 400,
            isValid: false,
            messageError: `ObjectId ${model} required.`
        }
    }
    try {
        const url = process.env.URL_DB;
        await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });

        const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

        if (!isValidObjectId) {
            // The provided id is not a valid ObjectId
            return {
                status: 400,
                isValid: false,
                messageError: `Not a valid ${model} ObjectId.`
            }
        }

        let data = null;

        switch (model) {
            case 'orchid':
                // Check if the orchid with the given ObjectId exists in the database
                data = await Orchids.findById(id);
                break;
            default:
                break;
        }

        if (data !== null) {
            return {
                isValid: true,// Returns true if data exists, false otherwise
            }
        } else {
            return {
                status: 400,
                isValid: false,
                messageError: 'ObjectId not found.'
            }
        }
    } catch (error) {
        console.error('Error checking ObjectId:', error);
        return {
            status: 500,
            isValid: false,
            messageError: error
        }
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

module.exports = new orchidServices();
