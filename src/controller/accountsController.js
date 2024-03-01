const accountService = require('../services/AccountService');

class accountsController {

    //get controller
    async AccountsPage(req, res, authenticatedUser) {
        let { arrUsers } = await accountService.getAllAccounts();
        console.log('check user', arrUsers);
        return res.render('UserAccount.ejs', { arrUsers, authenticatedUser: authenticatedUser });
    }

}

module.exports = new accountsController();
