const Card = require("../../Card");
const { PRIORITY_ITEM_GIVER_DEFAULT } = require("../../const/Priority");

module.exports = class BreadGiver extends Card {

    constructor(role) {
        super(role);

        this.meetings = {
            "Give Bread": {
                states: ["Night"],
                flags: ["voting"],
                action: {
                    labels: ["giveItem", "bread"],
                    priority: PRIORITY_ITEM_GIVER_DEFAULT,
                    run: function () {
                        this.target.holdItem("Bread");
                        this.queueGetItemAlert("Bread");
                    }
                }
            },
            "Give More Bread": {
                states: ["Night"],
                flags: ["voting"],
                action: {
                    labels: ["giveItem", "bread"],
                    priority: PRIORITY_ITEM_GIVER_DEFAULT,
                    run: function () {
                        this.target.holdItem("Bread");
                        this.queueGetItemAlert("Bread");
                    }
                }
            }
        };
        this.listeners = {
            "start": function () {

                for (let player of this.game.players) {
                    // give bread
                    let items = player.items.map(a => a.name);
                    let breadCount = 0;
                    for (let item of items) {
                        if (item === "Bread")
                            breadCount++;
                    }
                    while (breadCount < 2) {
                        player.holdItem("Bread");
                        breadCount++;
                    }

                    // give effect
                    if (!player.hasEffect("Famished"))
                        player.giveEffect("Famished");
                }
            },
        };
    }

}
