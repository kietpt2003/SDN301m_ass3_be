const mongoose = require('mongoose');
const Categories = require('../models/Categories');
const Orchids = require('../models/Orchids');
class categoryServices {
    async getAllCategories() {
        let arrCategories = [];
        try {
            const url = process.env.URL_DB;
            await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
            arrCategories = await Categories.find({});
            return arrCategories;
        } catch (error) {
            console.log(err);
        } finally {
            // Close the database connection
            mongoose.connection.close();
        }

        return arrCategories;
    }

    async getCategoryById(id) {
        try {
            let data = {}

            const url = process.env.URL_DB;
            await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
            try {
                data = await Categories.findById(id)
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

    async getCatetgoryByName(name, pageReq) {
        try {
            let data = {
                category: {},
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

                data.category = await Categories.find({ categoryName: { $regex: regex } })
                // .skip(startIndex).limit(data.itemsPerPage);

                data.totalPages = Math.ceil(data.category.length / data.itemsPerPage);

            } catch (error) {
                console.log('err: ', error);
            } finally {
                // Close the database connection
                mongoose.connection.close();
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
        }
    }

    async createCategory(newCategory) {
        try {
            let error = {}
            let isError = false

            if (newCategory.categoryName === '' || newCategory.categoryName === undefined) {
                error.isEmptyName = 'Name cannot be empty';
                isError = true;
            }
            if (isError) {
                return {
                    data: { currentCategory: newCategory },
                    error: error,
                }
            }
            let isExist = await checkCateName(newCategory.categoryName);
            if (isExist) {
                error.isDup = 'Name Duplicated';
                isError = true;
                return {
                    data: { currentCategory: newCategory },
                    error: error,
                }
            }
            if (!isError) {
                let cate = {};
                let data = {};

                try {
                    const url = process.env.URL_DB;
                    await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
                    data = new Categories({ categoryName: newCategory.categoryName, description: newCategory.description })
                    cate = await data.save();
                } catch (error) {
                    console.log(error);
                    return {
                        data: { currentCategory: newCategory },
                    }
                } finally {
                    // Close the database connection
                    mongoose.connection.close();
                }
                if (cate) {
                    return {
                        isSuccess: true
                    };
                } else {
                    error.createfailed = 'Something wrong';
                    return {
                        data: { currentCategory: newCategory },
                        error: error,
                    };
                }
            }
        } catch (error) {
            console.log(error);
            return { error: error };
        }
    }

    async updateCate(cate) {
        try {
            let error = {}
            let isError = false;
            console.log('check cate:', cate);
            if (cate.categoryName === '' || cate.categoryName === undefined) {
                error.isEmptyName = 'Name cannot be empty';
                isError = true;
            }
            if (isError) {
                return {
                    data: { currentCategory: cate },
                    error: error,
                }
            }

            if (cate.categoryName !== cate.currentName) {
                let isExist = await checkCateName(cate.categoryName);
                if (isExist) {
                    if (cate.categoryName !== cate.currentName) {
                        error.isDup = 'Name Duplicated';
                        isError = true;
                        return {
                            data: { currentCategory: cate },
                            error: error,
                        }
                    }
                }
            }

            if (!isError) {
                let data = {};
                try {
                    const url = process.env.URL_DB;
                    await mongoose.connect(url, { family: 4 });
                    data = await Categories.updateOne({ _id: cate.id }, { $set: { categoryName: cate.categoryName } })
                    if (data.modifiedCount >= 1) {
                        return {
                            isSuccess: true
                        };
                    } else {
                        error.createfailed = 'Something wrong';
                        return {
                            data: { currentCategory: cate },
                            error: error,
                        };
                    }

                } catch (error) {
                    console.log(error);
                    return {
                        data: { currentCategory: cate },
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

    async deleteCategoryById(id) {
        const error = {}

        const isExist = await checkCategoryById(id);
        const isError = await checkCateIsUsed(id);
        if (isError) {
            error.deleteFailed = 'Cannot delete cate that is used.';
            return {
                error: error,
            };
        }
        if (isExist) {
            try {
                const url = process.env.URL_DB;
                await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
                const data = await Categories.deleteOne({ "_id": id })
                if (data) {
                    return {
                        data: data,
                        deleteSuccess: true,
                    }
                }
            } catch (err) {
                console.log('error check: ', err);
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

let checkCateName = async (name) => {
    try {
        const url = process.env.URL_DB;
        await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
        const data = await Categories.findOne({ categoryName: name });
        if (data) {
            return true;
        }
        return false;
    } catch (error) {
        console.log('Catch error: ', error);
        return false;
    }
}

let checkCateIsUsed = async (id) => {
    try {
        if (id !== '' && id !== undefined) {
            const url = process.env.URL_DB;
            await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
            const data = await Orchids.findOne({ category: id })
            if (data) {
                return true;
            }
            return false;
        } else {
            resolve(false);
        }
    } catch (error) {
        console.log(error);
        return false
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

let checkCategoryById = async (id) => {
    try {
        if (id !== '' && id !== undefined) {
            const url = process.env.URL_DB;
            await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
            const data = await Categories.findOne({ _id: id })
            if (data) {
                return true;
            }
            return false;
        } else {
            resolve(false);
        }
    } catch (error) {
        console.log(error);
        return false
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

module.exports = new categoryServices();
