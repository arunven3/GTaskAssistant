interface SearchResultItem {
  title: string;
  link: string;
  snippet: string;
}

export const GoogleSearch = async (query: string) => {
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set(
    "q",
    `${query} ${"site:wikipedia.org OR site:gov.in OR site:thehindu.com OR site:ndtv.com OR site:timesofindia.indiatimes.com"}`,
  );
  url.searchParams.set("key", process.env.GOOGLE_API_KEY!);
  url.searchParams.set("cx", process.env.GOOGLE_CX!);

  const response = await fetch(url.toString());
  const searchResults = await response.json();

  //   console.log(
  //     "search items",
  //     url.toString(),
  //     searchResults,
  //     searchResults.items,
  //   );

  console.log(url);

  const context = searchResults.items
    ?.map(
      (r: SearchResultItem, i: number) =>
        `${i + 1}. ${r.title} - ${r.snippet} (${r.link})`,
    )
    .join("\n");

  //   console.log("context:" + context);
  return context;
};
