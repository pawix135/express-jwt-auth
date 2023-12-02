export function exclude<Type, Key extends keyof Type>(
  items: Type,
  keys: Key[]
): Omit<Type, Key> {
  return Object.fromEntries(
    Object.entries(items).filter(([key]) => !keys.includes(key))
  );
}
