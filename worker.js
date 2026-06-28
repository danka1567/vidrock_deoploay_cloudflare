export default {
    async fetch(request) {
        const url = new URL(request.url);
        const target = url.searchParams.get("url");
        if (!target) return new Response("missing url", { status: 400 });

        const r = await fetch(target, {
            headers: {
                "Referer": url.searchParams.get("ref") || "https://vidrock.ru/",
                "User-Agent": "Mozilla/5.0"
            }
        });
        const data = await r.text();
        return new Response(data, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}