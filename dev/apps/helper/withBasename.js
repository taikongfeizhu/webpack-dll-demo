import { useBasename } from 'history';

export default function withBasename(history, dirname) {
  return useBasename(() => history)({ basename: `/${dirname}` });
}
