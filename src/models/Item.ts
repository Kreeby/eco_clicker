export class Item {
  id: string;
  name: string;
  cost: number;
  benefit: number;
  icon: any;
  type: 'click' | 'passive';
  level: number;
  upgradeCostMultiplier: number;

  constructor(id: string, name: string, cost: number, benefit: number, icon: any, type: 'click' | 'passive',  upgradeCostMultiplier = 2) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.benefit = benefit;
    this.icon = icon;
    this.type = type;
    this.level = 1;
    this.upgradeCostMultiplier = upgradeCostMultiplier;
  }

  upgradeCost(): number {
    // This method calculates the cost to upgrade the item.
    // The logic here will depend on how you want upgrading to scale.
    // For example, it could be a fixed amount or increase with the item level.
    return this.cost * Math.pow(2, this.level);
  }

  upgrade() {
    this.level++;
    this.cost *= this.upgradeCost(); // Increase the cost for the next upgrade
    this.benefit *= 1.5; // Example: Increase benefit by 50% per upgrade
  }
}
