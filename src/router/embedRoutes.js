const { Router } = require('express');
const router = Router();
const embedControllers = require('../controllers/embedControllers');

router.get('/all', embedControllers.getAllEmbeds);
router.get('/one/:id', embedControllers.getOneEmbed);
router.post('/create', embedControllers.createEmbed);
router.put('/update/:id', embedControllers.updateEmbed);
router.delete('/delete/:id', embedControllers.deleteEmbed);

module.exports = router;