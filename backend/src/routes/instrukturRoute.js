const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const ctrl = require('../controllers/instrukturController');

// daftar semua instruktur
router.get('/', ctrl.getList);

// detail 1 instruktur
router.get('/:id_instruktur', ctrl.getDetail);

// tambah instruktur baru
router.post('/', upload.single('foto_instruktur'), ctrl.create);

// update instruktur
router.put('/:id_instruktur', upload.single('foto_instruktur'), ctrl.update);

// hapus instruktur
router.delete('/:id_instruktur', ctrl.remove);

module.exports = router;
