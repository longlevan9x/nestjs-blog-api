export const EnvironmentType = 'env';
export const Environment = {
  TYPE: {
    ENV: 'env',
    SHELL: 'shell',
  },
};

export const IsIgnoreEnvFile = EnvironmentType !== Environment.TYPE.ENV;
