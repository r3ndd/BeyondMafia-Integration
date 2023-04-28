const Card = require("../../Card");
const { PRIORITY_EFFECT_GIVER_DEFAULT } = require("../../const/Priority");

module.exports = class MindShifter extends Card {

    constructor(role) {
        super(role);

        this.meetings = {
            "Drive Insane": {
                states: ["Night"],
                flags: ["voting"],
                targets: { include: ["alive"], exclude: ["Monsters"] },
                action: {
                    labels: ["effect"],
                    priority: PRIORITY_EFFECT_GIVER_DEFAULT,
                    run: function () {
                        this.actor.role.data.insane = this.target;
                        this.target.queueAlert("You will be driven insane if not visited by a player not aligned with the Monsters!");
                    }
                }
            }
        };

        this.actions = [
            {
                labels: ["effect"],
                priority: PRIORITY_EFFECT_GIVER_DEFAULT-1,
                run: function() {
                    if (this.game.getStateName() != "Night")
                        return;

                    if (!this.actor.role.data.insane){
                        return;
                    }

                    var stillInsane = true;
                    var visitors = this.getVisitors(this.actor.role.data.insane);
                    for (let visitor of visitors){
                        if (visitor.role.alignment != "Monsters")
                            stillInsane = false;
                        }

                    if (stillInsane){
                        this.actor.role.data.insane.giveEffect("Insanity");
                        this.actor.role.data.insane.queueAlert(":sy3f: Reality fades as your mind is consumed by insanity.");
                    }

                    delete this.actor.role.data.insane;
                }
            }
        ];
    };
}