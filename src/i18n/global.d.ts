// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- import() is required in ambient declaration files
type Messages = (typeof import('./locales/en'))['default']

declare type IntlMessages = {} & Messages
