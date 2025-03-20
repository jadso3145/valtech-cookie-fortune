export const fetchFortune = async () => {
  try {
    const response = await fetch(`/api/dataentities/CF/search?_fields=CookieFortune`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Vtex-Use-Https": "true",
        "REST-Range": "resources=0-400",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      throw new Error("No fortune messages were found.");
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex]?.CookieFortune || "Keep trying!";
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
