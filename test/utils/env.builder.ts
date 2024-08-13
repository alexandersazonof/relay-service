const fs = require('fs');

interface EnvVariables {
  CHAIN_ID?: string;
  CHAIN_RPC_URL?: string;
  SACRA_RELAY_CONTRACT_ADDRESS?: string;
  PRIVATE_KEY?: string;
  PORT?: string;
  USER_ADDRESS?: string;
  USER_PRIVATE_KEY?: string;
  COUNTER_CONTRACT_ADDRESS?: string;
  COUNTER_GET_VALUE_CALL_ABI?: string;
}

interface IEnvInfo {
  key: keyof EnvVariables;
  value: string;
}

const parseEnv = (filePath: string): IEnvInfo[] => {
  const envExists = fs.existsSync(filePath);
  if (!envExists) return [];

  const env = fs.readFileSync(filePath, 'utf8');
  const lines = env.split('\n');
  return lines
    .map((line) => {
      const commentStartIndex = line.indexOf('#');
      const nonCommentLine =
        commentStartIndex === -1 ? line : line.substring(0, commentStartIndex - 1);
      return nonCommentLine.trim();
    })
    .filter(Boolean)
    .map((line) => {
      const keyValuePair = line.split('=').map((part) => part.trim());
      return { key: keyValuePair[0] as IEnvInfo['key'], value: keyValuePair[1] };
    });
};

const saveEnv = (filePath: string, env: IEnvInfo[]) => {
  const envContent = env
    .map(({ key, value }) => {
      return `${key}=${value}`;
    })
    .join('\n');
  fs.writeFileSync(filePath, envContent);
};

const createTestEnvFile = (path: string, newEnvInfo: IEnvInfo[]) => {
  const existingEnvInfo = parseEnv(path);
  const updatedEnvInfo = existingEnvInfo.map((oldEnvLine) => {
    const newValueExists = newEnvInfo.find((newEnvLine) => newEnvLine.key === oldEnvLine.key);
    if (newValueExists) return newValueExists;
    return oldEnvLine;
  });
  saveEnv(path, updatedEnvInfo);
};

module.exports = {
  createTestEnvFile,
};
