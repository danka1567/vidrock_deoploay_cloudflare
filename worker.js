export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");
    const ref = url.searchParams.get("ref") || "https://vidrock.ru/";
    if (!target) return new Response("missing url", { status: 400 });

    const r = await fetch(target, {
      headers: {
        "Referer": ref,
        "Origin": "https://vidrock.ru",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "application/json, */*",
      }
    });

    const text = await r.text();
    return new Response(text, {
      status: r.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}