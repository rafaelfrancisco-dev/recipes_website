// To parse this data:
//
//   import { Convert } from "./file";
//
//   const recipe = Convert.toRecipe(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Recipe {
  strIngredient10:             null | string;
  strIngredient11:             null | string;
  strMeasure20:                null | string;
  strMeasure13:                number | null | string;
  strMeasure6:                 number | null | string;
  strIngredient20:             null | string;
  strIngredient13:             null | string;
  strIngredient2:              string;
  strIngredient1:              string;
  strMeasure17:                number | null | string;
  strTags:                     null | string;
  strIngredient15:             null | string;
  strIngredient4:              string;
  strIngredient5:              null | string;
  strIngredient12:             null | string;
  strIngredient6:              null | string;
  strIngredient14:             null | string;
  strIngredient7:              null | string;
  strIngredient17:             null | string;
  strMeasure7:                 number | null | string;
  strIngredient8:              null | string;
  strIngredient9:              null | string;
  strIngredient16:             null | string;
  strIngredient19:             null | string;
  strIngredient3:              string;
  strIngredient18:             null | string;
  strArea:                     string;
  strMealThumb:                string;
  strCreativeCommonsConfirmed: null;
  strMeasure10:                number | null | string;
  strMeasure14:                number | null | string;
  strMeasure8:                 number | null | string;
  strMeal:                     string;
  strImageSource:              null;
  strMeasure18:                null | string;
  strSource:                   null | string;
  strMeasure1:                 number | string;
  strInstructions:             string;
  idMeal:                      number;
  strMeasure9:                 number | null | string;
  strMeasure2:                 number | string;
  dateModified:                null;
  strMeasure11:                number | null | string;
  strMeasure15:                number | null | string;
  strMeasure19:                null | string;
  strMeasure3:                 number | string;
  strYoutube:                  string;
  strCategory:                 string;
  strMeasure4:                 number | string;
  strMeasure12:                number | null | string;
  strMeasure16:                number | null | string;
  strDrinkAlternate:           null;
  strMeasure5:                 number | null | string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toRecipe(json: string): Recipe[] {
    return cast(JSON.parse(json), a(r("Recipe")));
  }

  public static recipeToJson(value: Recipe[]): string {
    return JSON.stringify(uncast(value, a(r("Recipe"))), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
  }
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = val[key];
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems') ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty('props') ? transformObject(getProps(typ), val)
          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "Recipe": o([
    { json: "strIngredient10", js: "strIngredient10", typ: u(null, "") },
    { json: "strIngredient11", js: "strIngredient11", typ: u(null, "") },
    { json: "strMeasure20", js: "strMeasure20", typ: u(null, "") },
    { json: "strMeasure13", js: "strMeasure13", typ: u(0, null, "") },
    { json: "strMeasure6", js: "strMeasure6", typ: u(0, null, "") },
    { json: "strIngredient20", js: "strIngredient20", typ: u(null, "") },
    { json: "strIngredient13", js: "strIngredient13", typ: u(null, "") },
    { json: "strIngredient2", js: "strIngredient2", typ: "" },
    { json: "strIngredient1", js: "strIngredient1", typ: "" },
    { json: "strMeasure17", js: "strMeasure17", typ: u(0, null, "") },
    { json: "strTags", js: "strTags", typ: u(null, "") },
    { json: "strIngredient15", js: "strIngredient15", typ: u(null, "") },
    { json: "strIngredient4", js: "strIngredient4", typ: "" },
    { json: "strIngredient5", js: "strIngredient5", typ: u(null, "") },
    { json: "strIngredient12", js: "strIngredient12", typ: u(null, "") },
    { json: "strIngredient6", js: "strIngredient6", typ: u(null, "") },
    { json: "strIngredient14", js: "strIngredient14", typ: u(null, "") },
    { json: "strIngredient7", js: "strIngredient7", typ: u(null, "") },
    { json: "strIngredient17", js: "strIngredient17", typ: u(null, "") },
    { json: "strMeasure7", js: "strMeasure7", typ: u(3.14, null, "") },
    { json: "strIngredient8", js: "strIngredient8", typ: u(null, "") },
    { json: "strIngredient9", js: "strIngredient9", typ: u(null, "") },
    { json: "strIngredient16", js: "strIngredient16", typ: u(null, "") },
    { json: "strIngredient19", js: "strIngredient19", typ: u(null, "") },
    { json: "strIngredient3", js: "strIngredient3", typ: "" },
    { json: "strIngredient18", js: "strIngredient18", typ: u(null, "") },
    { json: "strArea", js: "strArea", typ: "" },
    { json: "strMealThumb", js: "strMealThumb", typ: "" },
    { json: "strCreativeCommonsConfirmed", js: "strCreativeCommonsConfirmed", typ: null },
    { json: "strMeasure10", js: "strMeasure10", typ: u(0, null, "") },
    { json: "strMeasure14", js: "strMeasure14", typ: u(0, null, "") },
    { json: "strMeasure8", js: "strMeasure8", typ: u(3.14, null, "") },
    { json: "strMeal", js: "strMeal", typ: "" },
    { json: "strImageSource", js: "strImageSource", typ: null },
    { json: "strMeasure18", js: "strMeasure18", typ: u(null, "") },
    { json: "strSource", js: "strSource", typ: u(null, "") },
    { json: "strMeasure1", js: "strMeasure1", typ: u(0, "") },
    { json: "strInstructions", js: "strInstructions", typ: "" },
    { json: "idMeal", js: "idMeal", typ: 0 },
    { json: "strMeasure9", js: "strMeasure9", typ: u(0, null, "") },
    { json: "strMeasure2", js: "strMeasure2", typ: u(3.14, "") },
    { json: "dateModified", js: "dateModified", typ: null },
    { json: "strMeasure11", js: "strMeasure11", typ: u(0, null, "") },
    { json: "strMeasure15", js: "strMeasure15", typ: u(0, null, "") },
    { json: "strMeasure19", js: "strMeasure19", typ: u(null, "") },
    { json: "strMeasure3", js: "strMeasure3", typ: u(0, "") },
    { json: "strYoutube", js: "strYoutube", typ: "" },
    { json: "strCategory", js: "strCategory", typ: "" },
    { json: "strMeasure4", js: "strMeasure4", typ: u(3.14, "") },
    { json: "strMeasure12", js: "strMeasure12", typ: u(0, null, "") },
    { json: "strMeasure16", js: "strMeasure16", typ: u(0, null, "") },
    { json: "strDrinkAlternate", js: "strDrinkAlternate", typ: null },
    { json: "strMeasure5", js: "strMeasure5", typ: u(0, null, "") },
  ], false),
};
