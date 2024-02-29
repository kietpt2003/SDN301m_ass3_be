const mongoose = require('mongoose');
const Orchids = require('../models/Orchids');
const passport = require('passport');
const Categories = require('../models/Categories');
const CategoryService = require('./CategoryService');

class orchidServices {
    async getAllOrchids() {
        const url = process.env.URL_DB;
        await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
        let arrOrchids = [];
        let arrCategories = []
        try {
            arrOrchids = await Orchids.find({}).populate('category');
            arrCategories = await Categories.find({})
            return { arrOrchids, arrCategories };
        } catch (error) {
            console.log(error);
            return { arrOrchids, arrCategories };
        } finally {
            // Close the database connection
            mongoose.connection.close();
        }
    }

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
            console.log('check ', name);
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
                // .skip(startIndex).limit(data.itemsPerPage);

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
        try {
            let error = {}
            let isError = false

            let arrCategories = [];

            try {
                const url = process.env.URL_DB;
                await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
                arrCategories = await Categories.find({})
            } catch (error) {
                arrOrchids = [];
                arrCategories = [];
            } finally {
                // Close the database connection
                mongoose.connection.close();
            }
            console.log('check cate:', newOrchid.cateId);

            if (newOrchid.orchidName === '' || newOrchid.orchidName === undefined) {
                error.isEmptyName = 'Name cannot be empty';
                isError = true;
            }
            if (newOrchid.image === '' || newOrchid.image === undefined) {
                error.isEmptyImg = 'Image cannot be empty';
                isError = true;
            }
            if (newOrchid.cateId === '' || newOrchid.cateId === undefined) {
                error.isEmptyCate = 'Please choose category';
                isError = true;
            }
            if (newOrchid.origin === '' || newOrchid.origin === undefined) {
                error.isEmptyOriginal = 'Origin cannot be empty';
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
            if (isError) {
                return {
                    data: { arrCategories, currentOrchid: newOrchid },
                    error: error,
                }
            }
            let isExist = await checkOrchidName(newOrchid.orchidName);
            if (isExist) {
                error.isDup = 'Name Duplicated';
                isError = true;
                return {
                    data: { arrCategories, currentOrchid: newOrchid },
                    error: error,
                }
            }
            if (!isError) {
                console.log('check cateId: ', newOrchid.cateId);
                const cate = await CategoryService.getCategoryById(newOrchid.cateId);
                console.log('check cate data: ', cate.data);
                let data = {};
                let orc = {};
                try {
                    const url = process.env.URL_DB;
                    await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });

                    data = new Orchids({ name: newOrchid.orchidName, image: newOrchid.image, origin: newOrchid.origin, isNatural: newOrchid.isNatural === 'true' ? true : false, category: cate.data._id });
                    orc = await data.save();
                } catch (error) {
                    console.log(error);
                    return {
                        data: { arrCategories, currentOrchid: newOrchid },
                    }
                } finally {
                    // Close the database connection
                    mongoose.connection.close();
                }
                console.log('check orc ', orc);
                if (orc) {
                    arrCategories = []
                    try {
                        const url = process.env.URL_DB;
                        await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
                        arrCategories = await Categories.find({})
                        return {
                            data: { arrCategories },
                            isSuccess: true
                        };
                    } catch (error) {
                        console.log(error);
                        return {
                            data: { arrCategories, currentOrchid: newOrchid },
                        };
                    } finally {
                        // Close the database connection
                        mongoose.connection.close();
                    }
                } else {
                    error.createfailed = 'Something wrong';
                    return {
                        data: { arrCategories },
                        error: error,
                    };
                }
            }
        } catch (error) {
            return { error: error };
        }
    }

    async updateOrc(newOrchid) {
        try {
            let error = {}
            let isError = false;

            if (newOrchid.name === '' || newOrchid.name === undefined) {
                error.isEmptyName = 'Name cannot be empty';
                isError = true;
            }
            if (newOrchid.image === '' || newOrchid.image === undefined) {
                error.isEmptyImg = 'Image cannot be empty';
                isError = true;
            }
            if (newOrchid.cateId === '' || newOrchid.cateId === undefined) {
                error.isEmptyCate = 'Please choose category';
                isError = true;
            }
            if (newOrchid.origin === '' || newOrchid.origin === undefined) {
                error.isEmptyOriginal = 'Origin cannot be empty';
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
            if (isError) {
                return {
                    data: { currentOrchid: newOrchid },
                    error: error,
                }
            }

            if (newOrchid.name !== newOrchid.currentName) {
                console.log('vo day: ', newOrchid.name, 'cur:', newOrchid.currentName);
                let isExist = await checkOrchidName(newOrchid.name);
                if (isExist) {
                    error.isDup = 'Name Duplicated';
                    isError = true;
                    return {
                        data: { currentOrchid: newOrchid },
                        error: error,
                    }
                }
            }

            if (!isError) {
                console.log('check cateId: ', newOrchid.cateId);
                const cate = await CategoryService.getCategoryById(newOrchid.cateId);
                let data = {};
                try {
                    const url = process.env.URL_DB;
                    await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });

                    data = await Orchids.updateOne({ _id: newOrchid.id }, { $set: { name: newOrchid.name, image: newOrchid.image, origin: newOrchid.origin, isNatural: newOrchid.isNatural === 'true' ? true : false, category: cate.data._id } })
                    if (data.modifiedCount >= 1) {
                        return {
                            isSuccess: true
                        };
                    } else {
                        error.createfailed = 'Something wrong';
                        return {
                            data: { currentOrchid: newOrchid },
                            error: error,
                        };
                    }
                } catch (error) {
                    console.log(error);
                    return {
                        data: { currentOrchid: newOrchid },
                    }
                } finally {
                    // Close the database connection
                    mongoose.connection.close();
                }
            }
        } catch (error) {
            console.log('Something wrong: ', error)
            return {
                error: error,
            };
        }
    }

    async deleteOrchidById(id) {
        const error = {}
        // let arrOrchids = await getAllOrchids();
        const isExist = await checkOrchidById(id);
        if (isExist) {
            try {
                const url = process.env.URL_DB;
                await mongoose.connect(url, { family: 4 });
                const data = await Orchids.deleteOne({ "_id": id })
                if (data) {
                    return {
                        data: data,
                        deleteSuccess: true,
                    }
                }
            } catch (err) {
                console.log(err);
                error.dbError = 'Something wrong with DB';
                return {
                    error: error
                }
            } finally {
                // Close the database connection
                mongoose.connection.close();
            }
        } else {
            error.missingId = 'Missing Id or wrong Id'
            return {
                error: error
            }
        }
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
            const connect = mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
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

let checkOrchidById = async (id) => {
    try {
        if (id !== '' && id !== undefined) {
            const url = process.env.URL_DB;
            await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
            const data = await Orchids.findOne({ _id: id })
            if (data) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
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
