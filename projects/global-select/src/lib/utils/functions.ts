/**
 * Test if the variable contains something. If not returns the class "disabled" to css styles.
 * @param variableToTest Test if the variable contains something
 * @param actualClass Actual classes from the element tag "Class"
 */
export function getDisabled(variableToTest: any, actualClass: string): string {
  return !variableToTest ? 'disabled ' + actualClass : actualClass;
}

export function filterArray(search, items) {
  const searchUpper = search.toUpperCase();
  return items.filter(item => {
    const itemType = <string>typeof item;

    if (itemType === 'Object' || !(item instanceof Array)) {
      const keys = Object.keys(item);
      for (const key of keys) {
        if (typeof item[key] === 'string' || typeof item[key] === 'number') {
          if (('' + item[key]).toUpperCase().includes(searchUpper)) {
            return true;
          }
        }
      }
    } else if (itemType === 'string' || itemType === 'number') {
      return ('' + item).toUpperCase().includes(searchUpper);
    }

    return false;
  });
}

export function compareStrings(a, b) {
  return a.localeCompare(b, undefined, { sensitivity: 'base' });
}
