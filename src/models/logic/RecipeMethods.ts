import { Recipe } from '../Recipe';

export class RecipeMethods {
  static getNumberOfIngredients(recipe: Recipe): number {
    let steps = 0;

    Object.keys(recipe).forEach((key: string) => {
      if (key.includes('Ingredient')) {
        const val = (recipe as any)[key];
        if (val !== undefined && val !== null && val !== '') {
          steps += 1;
        }
      }
    });

    return steps;
  }

  static getTags(recipe: Recipe): String[] {
    const tags: String[] = [];

    Object.keys(recipe).forEach((key: string) => {
      if (key.includes('Ingredient')) {
        const val = (recipe as any)[key];
        if (val !== undefined && val !== null && val !== '') {
          tags.push(val as String);
        }
      }
    });

    const s = new Set(tags);
    const it = s.values();

    return Array.from(it);
  }
}
