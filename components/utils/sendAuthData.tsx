import { AuthResponseConfig } from "../interfaces";

interface Props {
  route: string;
  data: object;
}

export default async function SendAuthData({ route, data }: Props) {
  const response = await fetch(route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = (await response.json()) as AuthResponseConfig;

  return res;
}
