const fs = require('fs');
const path = require('path');

const VAR_DATA = path.join(__dirname, '../data/vars.json');

const dirPath = path.dirname(VAR_DATA);
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

// Read
function readData() {
    if (!fs.existsSync(VAR_DATA)) return {};
    try {
        return JSON.parse(fs.readFileSync(VAR_DATA, 'utf8'));
    } catch {
        return {};
    }
}

// Save
function saveData(data) {
    fs.writeFileSync(VAR_DATA, JSON.stringify(data, null, 2), 'utf8');
}

// Get argumen
const arg = process.argv[2];
if (!arg) {
    console.log("Usage:\n  +key=value (Save/Overwrite)\n  ?key       (Read)\n  -key       (Delete)");
    process.exit(1);
}

const data = readData();
if (arg.startsWith('+')) {
    const content = arg.substring(1);
    const [key, value] = content.split('=');
    if (!key || !value) {
        console.log("[!] Invalid format. Expected : +key=value");
    } else {
        data[key] = value;
        saveData(data);
    }
} else if (arg.startsWith('?')) {
    const key = arg.substring(1);
    
    if (data[key] !== undefined) {
        console.log(data[key]);
    } else {
        console.log("[?] Variable not found");
    }
} else if (arg.startsWith('-')) {
    const key = arg.substring(1);
    if (data[key] !== undefined) {
        delete data[key];
        saveData(data);
    } else {
        console.log("[?] Variable not found");
    }
} else {
    console.log("[/] Invalid system format: \n\tsave    >>  +key=value \n\tread    >>  ?key \n\tdelete  >>  -key");
}
