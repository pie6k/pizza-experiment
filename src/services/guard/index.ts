export function getSafely<T>(
  getter: () => T,
  backupValue: T = null,
  warnOnErrors = false,
) {
  try {
    const value = getter();

    if ([undefined].includes(value)) {
      return backupValue;
    }

    return value;
  } catch (error) {
    return backupValue;
  }
}

export function runSafely(callback: () => void) {
  try {
    callback();
  } catch (error) {}
}
