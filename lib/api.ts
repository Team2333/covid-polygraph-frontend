function colorMap(num: number): [string, boolean] {
  let color: string;
  if (num < -0.6) color = 'var(--para-color-n-5)';
  else if (num < -0.4) color = 'var(--para-color-n-4)';
  else if (num < -0.2) color = 'var(--para-color-n-3)';
  else if (num < -0.1) color = 'var(--para-color-n-2)';
  else if (num < -0.05) color = 'var(--para-color-n-1)';
  else if (num < 0) color = 'var(--para-color-n-0)';
  else if (num <= 0.05) color = 'var(--para-color-p-0)';
  else if (num <= 0.1) color = 'var(--para-color-p-1)';
  else if (num <= 0.2) color = 'var(--para-color-p-2)';
  else if (num <= 0.4) color = 'var(--para-color-p-3)';
  else if (num <= 0.6) color = 'var(--para-color-p-4)';
  else color = 'var(--para-color-p-5)';
  return [color, num > 0.2 || num < -0.2];
}

export const verifyApi = async (
  text: string,
): Promise<{ isReal: boolean; data: { token: string; color: string, impt: boolean, isStart: boolean }[] }> => {
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
  return {
    isReal: data.is_real,
    data: (data.data.slice(1, data.data.length - 1) as (string | number)[][])
      .map((x) => {
        const token = x[0] as string;
        const [color, impt] = colorMap(x[1] as number);
        return {
          token: token.startsWith('##') ? token.slice(2) : token,
          color,
          impt,
          isStart: !token.startsWith('##') && token !== '.' && token !== ',' && token !== ';' && token !== ':' && token !== '!' && token !== '?' && token !== '\'',
        };
      }),
  };
};
