export const verifyApi = async (text: string) => {
  const res = await fetch('https://api.covid-polygraph.ml/verify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: text,
    }),
  });
  const data = await res.json();
  return data;
};
