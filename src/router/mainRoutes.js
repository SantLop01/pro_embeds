const { Router } = require('express');
const router = Router();
const mainControllers = require('../controllers/mainControllers');

router.get('/', mainControllers.viewHome);
router.get('/home', mainControllers.viewHome);
router.get('/schendules', mainControllers.viewSchendules);
router.get('/embed-preview/:id', mainControllers.viewEmbedPreview);

module.exports = router;