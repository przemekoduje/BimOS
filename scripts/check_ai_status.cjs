const fs = require('fs');
const path = require('path');

/**
 * Zwraca true, jeśli globalny Kill-Switch jest aktywny.
 */
function isAiDisabled() {
  const killSwitchPath = path.join(__dirname, '../.AI_DISABLED');
  if (fs.existsSync(killSwitchPath)) {
    console.log("🛑 AI Kill-switch is active. Blocking request.");
    return true;
  }
  return false;
}

module.exports = { isAiDisabled };
