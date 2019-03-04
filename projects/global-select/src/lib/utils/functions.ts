/**
 * Test if the variable contains something. If not returns the class "disabled" to css styles.
 * @param variableToTest Test if the variable contains something
 * @param actualClass Actual classes from the element tag "Class"
 */
export function getDisabled(variableToTest: any, actualClass: string): string {
  return !variableToTest ? 'disabled ' + actualClass : actualClass;
}
