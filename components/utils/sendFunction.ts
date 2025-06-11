interface Props {
  data: object;
  route: string;
}

export default async function SendData({ data, route }: Props) {
  console.log(data);
  try {
    var response = await fetch(`/api/${route}`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (e) {
    console.log(e);
    return e;
  }
}
