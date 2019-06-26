module.exports = async function() {
  const cp = require("child_process");

  const hashrate = {
    "Total Hashrate": null,
    Hashrate: []
  };

  let api = cp
    .execSync('echo \'{"command":"summary+devs"}\' | nc -w 2 localhost 4029')
    .toString();
  api = JSON.parse(api);
  hashrate["Total Hashrate"] = api.summary.SUMMARY[0]["KHS 30s"] * 1000;

  for (let i = 0; i < api.devs.DEVS.length; i++) {
    hashrate["Hashrate"].push(
      Math.round(api.devs.DEVS[i]["KHS 30s"] * 1000) + " h/s"
    );
  }

  return hashrate;
};
