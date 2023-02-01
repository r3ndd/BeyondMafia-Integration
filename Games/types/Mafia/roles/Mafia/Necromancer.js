const Role = require("../../Role");

module.exports = class Necromancer extends Role {

    constructor(player, data) {
        super("Necromancer", player, data);
        this.alignment = "Mafia";
        this.cards = ["VillageCore", "WinWithMafia", "MeetingMafia", "Revive"];
    }

}
