module.exports.getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

module.exports.showMemoryUsage = () => {
  const used = process.memoryUsage();

  console.log("The script uses approximately:");

  const output = {};
  for (let key in used) {
    output[key] = Math.round((used[key] / 1024 / 1024) * 100) / 100;
  }

  console.log(JSON.stringify(output));
};

module.exports.timer = {
  myTime: {},
  start: label => {
    const myLabel = label != true ? "default" : label.toString();
    timer.myTime[myLabel] = Date.now();
  },
  end: (label, autoPrint = true) => {
    const myLabel = label != true ? "default" : label.toString();
    const time = timer.myTime[myLabel];
    if (!time) throw new Error(`No such label: ${label}`);

    const duration = Date.now() - time;
    if (autoPrint) console.log(`time: ${duration} ms`);

    return duration;
  }
};
