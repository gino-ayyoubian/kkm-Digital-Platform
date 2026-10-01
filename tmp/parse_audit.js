const fs = require("fs");
const html = fs.readFileSync("/tmp/youmind_audit.html", "utf8");

function extractArray(src, varName) {
  const marker = "var " + varName + "=[";
  const start = src.indexOf(marker);
  if (start === -1) {
    console.log("Marker not found:", marker);
    return null;
  }
  let depth = 0;
  let inString = null;
  let escape = false;
  let end = -1;
  const arrayStart = start + marker.length - 1;
  for (let i = arrayStart; i < src.length; i++) {
    const c = src[i];
    if (inString) {
      if (escape) {
        escape = false;
      } else if (c === "\\") {
        escape = true;
      } else if (c === inString) {
        inString = null;
      }
    } else {
      if (c === '"' || c === "'" || c === "`") {
        inString = c;
      } else if (c === "[") {
        depth++;
      } else if (c === "]") {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
  }
  if (end === -1) {
    console.log("Could not find matching bracket for", varName);
    return null;
  }
  const jsonStr = src.substring(arrayStart, end + 1);
  return new Function("return " + jsonStr)();
}

const findings = extractArray(html, "FINDINGS");
const tickets = extractArray(html, "TICKETS");

fs.writeFileSync("/tmp/audit_data.json", JSON.stringify({ findings, tickets }, null, 2));
console.log("Extracted findings:", findings ? findings.length : 0);
console.log("Extracted tickets:", tickets ? tickets.length : 0);
