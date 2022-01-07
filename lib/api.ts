function colorMap(num: number): string {
  if (num < -0.6) return 'var(--para-color-n-5)';
  if (num < -0.4) return 'var(--para-color-n-4)';
  if (num < -0.2) return 'var(--para-color-n-3)';
  if (num < -0.1) return 'var(--para-color-n-2)';
  if (num < -0.05) return 'var(--para-color-n-1)';
  if (num < 0) return 'var(--para-color-n-0)';
  if (num < 0.05) return 'var(--para-color-p-0)';
  if (num < 0.1) return 'var(--para-color-p-1)';
  if (num < 0.2) return 'var(--para-color-p-2)';
  if (num < 0.4) return 'var(--para-color-p-3)';
  if (num < 0.6) return 'var(--para-color-p-4)';
  return 'var(--para-color-p-5)';
}

export const verifyApi = async (
  text: string,
): Promise<{ isReal: boolean; data: { token: string; color: string, isStart: boolean }[] }> => {
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
          isStart: !token.startsWith('##'),
        };
      }),
  };
};
