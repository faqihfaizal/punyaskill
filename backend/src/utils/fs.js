const fs = require('fs');

function deleteFileIfExists(p) {
    if (!p) return;
    try {
        if (fs.existsSync(p)) fs.unlinkSync(p);
    } catch (err){
        console.warn('deleteFileIfExists Warning: ', err.message);
    }
}

module.exports = {deleteFileIfExists};