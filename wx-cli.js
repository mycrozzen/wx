const path = require('path');
const fs = require('fs');
const workingDir = process.env.PWD || process.cwd();

function cs(text, styles='', res=true) {
  // res : respone with return, not console.log()
  const codes = {
    $r: "\x1b[0m", 
    $b: "\x1b[1m", 
    $d: "\x1b[2m", 
    $i: "\x1b[3m", 
    $u: "\x1b[4m", 
    $s: "\x1b[7m",
    bk: "\x1b[30m", 
    r: "\x1b[31m", 
    g: "\x1b[32m", 
    y: "\x1b[33m", 
    s: "\x1b[34m", 
    m: "\x1b[35m", 
    c: "\x1b[36m", 
    w: "\x1b[37m", 
    g: "\x1b[90m",
    BK: "\x1b[40m", 
    R: "\x1b[41m", 
    G: "\x1b[42m", 
    Y: "\x1b[43m", 
    B: "\x1b[44m", 
    M: "\x1b[45m", 
    C: "\x1b[46m", 
    W: "\x1b[47m"
  };
  const appliedStyles = styles.split(' ')
      .map(style => codes[style] || '')
      .join('');
  if (!res) {
    console.log(`${appliedStyles}${text}${codes.$r}`);
  } else {
    return `${appliedStyles}${text}${codes.$r}`
  }
}

// Create Python Reference
function print(output){ console.log(output) }
function input(question) {
  process.stdout.write(question);
  const buffer = Buffer.alloc(1024);
  let fd;
  try {
    fd = fs.openSync('/dev/stdin', 'r');
  } catch (e) {
    fd = fs.openSync('CON', 'r');
  }
  const bytesRead = fs.readSync(fd, buffer, 0, 1024, null);
  fs.closeSync(fd);
  return buffer.toString('utf8', 0, bytesRead).trim();
}

let MAIN_LOOP = true
function prompt(info, pwx_location){
  const suffix = " $ "
  let project_loc = "unkown"
  let text = ""
  text+= `[${cs(project_loc,"g")}]` 
  text+= `[${cs(info,"c")}]`
  text+= cs(pwx_location,"$i y")
  return (text+suffix)
}

while (MAIN_LOOP) {
  try {

    // Main CLI Program
    let in_command = input(prompt("?",workingDir))
    print(in_command)
      
  } catch (error) {
    
  }
}







