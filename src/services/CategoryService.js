import mongoose from 'mongoose';
import Categories from '../models/Categories'

export const getAllCategories = async () => {
    const url = process.env.URL_DB;
    const connect = mongoose.connect(url, { family: 4 });
    let arrCategories = [];

    arrCategories = connect.then(() => {
        console.log('Connected correctly to server');
        return Categories.find({})
            .then(async (categories) => {
                await mongoose.disconnect();
                return categories;
            })
            .catch((err) => {
                console.log(err);
                arrCategories = [];
            });
    });

    return arrCategories;
}

export const createCategory = async (newCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            let error = {}
            let isError = false
            // let arr = await getAllCategories();
            if (newCategory.cateName === '' || newCategory.cateName === undefined) {
                error.isEmptyName = 'Name cannot be empty';
                isError = true;
            }
            if (newCategory.description === '' || newCategory.description === undefined) {
                error.isEmptyDes = 'Description cannot be empty';
                isError = true;
            }
            if (isError) {
                resolve({
                    error: error,
                    // arrCategories: arr
                })
            }
            let isExist = await checkCateName(newCategory.cateName);
            if (isExist) {
                error.isDup = 'Name Duplicated';
                isError = true;
                resolve({
                    error: error,
                    // arrCategories: arr
                })
            }
            if (!isError) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Categories({ name: newCategory.cateName, description: newCategory.description }).save()
                        .then(async (cate) => {
                            if (cate) {
                                // arr = await getAllCategories();
                                await mongoose.disconnect();
                                resolve({
                                    // arrCategories: arr,
                                    data: cate,
                                    isSuccess: true
                                });
                            } else {
                                error.createfailed = 'Something wrong';
                                await mongoose.disconnect();
                                resolve({
                                    error: error,
                                    // arrCategories: arr
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

let checkCateName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = process.env.URL_DB;
            const connect = mongoose.connect(url, { family: 4 });
            connect.then(() => {
                Categories.findOne({ name: name })
                    .then(async (category) => {
                        if (category) {
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

let checkCategoryById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id !== '' && id !== undefined) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Categories.findOne({ _id: id })
                        .then((category) => {
                            mongoose.disconnect().then(() => {
                                if (category) {
                                    resolve(true);
                                }
                                resolve(false);
                            });
                        })
                        .catch((err) => {
                            console.log('loi ne: ', err);
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

export const updateCate = async (cate) => {
    return new Promise(async (resolve, reject) => {
        try {
            let error = {}
            let isError = false;
            let isExist = false;
            if (cate.id === '' || cate.id === undefined) {
                error.invalidId = "Required Id";
                isError = true;
                resolve({
                    errorUpdate: error
                });
            } else {
                isExist = await checkCategoryById(cate.id);
            }
            // let arr = await getAllCategories();
            if (isExist) {
                if (cate.name === '' || cate.name === undefined) {
                    error.isEmptyName = 'Name cannot be empty';
                    isError = true;
                }
                if (cate.description === '' || cate.description === undefined) {
                    error.isEmptyDes = 'Description cannot be empty';
                    isError = true;
                }
                if (isError) {
                    resolve({
                        errorUpdate: error,
                        // arrCategories: arr
                    })
                }
                isExist = await checkCateName(cate.name);
                if (isExist) {
                    if (cate.name !== cate.currentName) {
                        error.isDup = 'Name Duplicated';
                        isError = true;
                        resolve({
                            errorUpdate: error,
                            // arrCategories: arr
                        })
                    }
                }
            } else {
                error.invalidId = "Id doesn't exist.";
                isError = true;
                resolve({
                    errorUpdate: error,
                    // arrCategories: arr
                })
            }
            if (!isError) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Categories.updateOne({ _id: cate.id }, { $set: { name: cate.name, description: cate.description } })
                        .then(async (isUpdated) => {
                            if (isUpdated.modifiedCount >= 1) {
                                // arr = await getAllCategories();
                                await mongoose.disconnect();
                                resolve({
                                    // arrCategories: arr,
                                    data: isUpdated,
                                    isUpdate: true
                                });
                            } else {
                                error.createfailed = 'Something wrong';
                                await mongoose.disconnect();
                                resolve({
                                    errorUpdate: error,
                                    // arrCategories: arr
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

export const deleteCategoryById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const error = {}
            // let arrCategories = await getAllCategories();
            const isExist = await checkCategoryById(id);
            if (isExist) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Categories.deleteOne({ "_id": id })
                        .then(async (category) => {
                            // arrCategories = await getAllCategories();
                            await mongoose.disconnect();
                            resolve(
                                {
                                    data: category,
                                    deleteSuccess: true,
                                    // arrCategories: arrCategories
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
                                    // arrCategories: arrCategories
                                }
                            )
                        });
                })
            } else {
                error.missingId = 'Missing Id or wrong Id'
                resolve(
                    {
                        error: error,
                        // arrCategories: arrCategories
                    }
                )
            }
        } catch (error) {
            resolve({ error: error })
        }
    })
}