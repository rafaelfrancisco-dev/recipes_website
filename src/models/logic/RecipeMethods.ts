import { Recipe } from '../Recipe';

export class RecipeMethods {
  static getNumberOfIngredients(recipe: Recipe): number {
    let steps = 0;

    Object.keys(recipe).forEach((key: string) => {
      if (key.includes('Ingredient')) {
        const val = (recipe as any)[key];
        if (val !== undefined && val !== null) {
          steps += 1;
        }
      }
    });

    return steps;
  }
}
