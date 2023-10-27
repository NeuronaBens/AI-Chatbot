export class IdManager {
  static randomStr(strLength) {
    const chars = [
      ..."a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    return [...Array(strLength)]
      .map(() => chars[Math.trunc(Math.random() * chars.length)])
      .join("");
  }

  static generate(options = {}) {
    const now = String(Date.now());
    const middlePos = Math.ceil(now.length / 2);
    let output = `${now.substr(0, middlePos)}-${IdManager.randomStr(
      6
    )}-${now.substr(middlePos)}`;
    // We add a 3 letter CODE in front of the id to make it more recognizable
    if (options.prefix) output = `${options.prefix}-${output}`;
    return output;
  }

  static userId() {
    return IdManager.generate({ prefix: "USR" });
  }
  static taskId() {
    return IdManager.generate({ prefix: "TSK" });
  }
  static roleId() {
    return IdManager.generate({ prefix: "ROL" });
  }
  static careerId() {
    return IdManager.generate({ prefix: "CAR" });
  }
  static settingsId() {
    return IdManager.generate({ prefix: "STG" });
  }
  static studentTaskId() {
    return IdManager.generate({ prefix: "STK" });
  }
  static stressLevelsId() {
    return IdManager.generate({ prefix: "SLV" });
  }
  static anxietyLevelsId() {
    return IdManager.generate({ prefix: "ALV" });
  }
  static messageId() {
    return IdManager.generate({ prefix: "MSG" });
  }
  static notificationId() {
    return IdManager.generate({ prefix: "NTF" });
  }
  static studentNotificationId() {
    return IdManager.generate({ prefix: "SNT" });
  }
  static complaintId() {
    return IdManager.generate({ prefix: "COM" });
  }
}
