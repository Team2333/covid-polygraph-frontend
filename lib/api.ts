function colorMap(num: number): string {
  let h = 0;
  let s = 100;
  let l = 50;
  if (num < 0) {
    l = 50 - (1 + num) **3 * 50;
  } else {
    s = 100;
    l = 50 - (1 - num) **3 * 50;
  }
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export const verifyApi = async (
  text: string,
): Promise<{ isReal: boolean; data: { token: string; color: string }[] }> => {
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
  // remove first and last item from data.data
  return {
    isReal: data.isReal,
    data: (data.data.slice(1, data.data.length - 1) as (string | number)[][])
      .map((x) => {
        const token = x[0] as string;
        const color = colorMap(x[1] as number);
        return {
          token: token.startsWith('##') ? token.slice(2) : token,
          color,
        };
      }),
  };
};
