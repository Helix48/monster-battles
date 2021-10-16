export class BattleAction {
  constructor(name, baseValue, target,heal = false, manaCost = 0, variance = 0.4) {
    this.name = name;
    this.baseValue = baseValue;
    this.target = target;
    this.variance = variance;
    this.heal = heal;
    this.manaCost = manaCost;
  }
}