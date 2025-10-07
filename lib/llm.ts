export async function callLLM(prompt: {system:string, user:string}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      captions: {
        short: "Pack lighter, travel farther. Here’s my 3-item rule.",
        medium: "Kotor sunrise and the 3-item rule that saved my backpack (and my sanity).",
        long: "Sunrise over Kotor Bay. My ultralight packing rule: 3 essentials, zero dead weight. Try it on your next trip and feel the difference."
      },
      hashtags: {
        primary: ["TravelTips","Kotor","PackingLight","Balkans","MinimalistTravel"],
        secondary: ["TravelHacks","NomadLife","CarryOnOnly","DroneViews","EuropeTravel","Adventure","BudgetTravel","Itinerary","Backpack","SunriseMagic"],
        experimental: ["MicroPacking","OneBag","HiddenGems","Adriatic","SeaToSummit"]
      },
      hooks: [
        "The packing rule I wish I knew 10 countries ago:",
        "If your carry-on feels like bricks, try this:",
        "Kotor at sunrise + a packing trick that never fails:"
      ],
      fit: { chars_ok: true, hashtags_ok: true },
      meta: { platform: "tiktok", model: "mock", tokens: 512 }
    };
  }
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user }
      ]
    })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM error: ${text}`);
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  return JSON.parse(content);
}
