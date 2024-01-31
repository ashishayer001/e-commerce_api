export const extractTokenFromHeader = (headers) => {
  const authorization = headers.authorization;

  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  return token;
};
