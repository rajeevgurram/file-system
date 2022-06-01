const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require("os");
const moment = require('moment');
const app = express();

const rootDirectory = (os.platform == "win32") ? process.cwd().split(path.sep)[0] : "/";
app.get('/directories/*', (req, res) => {
    const directory = path.resolve(rootDirectory, req.params[0] || '');
    let response = [];

    try {
        const directories = fs.readdirSync(directory);
        directories.forEach(file => {
            if(!file.startsWith(".")) {
                const stats = fs.statSync(path.resolve(directory, file));
                const data = {
                    type: stats.isDirectory() ? 'folder' : 'file',
                    name: file,
                    modified: moment(stats.mtime).format('MM/DD/YYYY'),
                    size: stats.size,
                    absolute_path: path.resolve(directory, file)
                };
                response.push(data);
            }
        });
        res.status(200);
    } catch(e) {
        console.log(e);
        res.status(500);
        response = {};
        response.error = true;
        response.message = e;
    }
    res.send(response);
});

const PORT = process.env.PORT || 8090;
app.listen(PORT, (error) =>{
    if(!error)
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
    else 
        console.log("Error occurred, server can't start", error);
    }
);