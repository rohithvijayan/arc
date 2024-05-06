const fetchMeta = async (tabUrl: string) => {
  const response = await fetch("/api/metadata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: tabUrl }),
  });
  if (!response.ok) {
    throw new Error("failed to fetch");
  }
  return response.json();
};
export default fetchMeta;
