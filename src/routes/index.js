const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => {
    res.render('partials/index.hbs');

});
 

module.exports = router;