export default function fetcher(input, init = null) {
  return fetch(input, init)
    .then((res) => res.json())
    .catch((err) => err);
}
