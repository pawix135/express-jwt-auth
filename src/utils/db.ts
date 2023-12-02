export function exclude<Type, Key extends keyof Type>(
  items: Type,
  keys: Key[]
): Omit<Type, Key> {
  //@ts-ignore
  return Object.fromEntries(
    //@ts-ignore
    Object.entries(items).filter(([key]) => !keys.includes(key))
  );
}
