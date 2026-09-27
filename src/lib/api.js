// FitLog API helper — Server Component থেকে ডাটা ফেচ করার জন্য
const PRIMARY_API = "https://api.abcz.workers.dev/api/fitlog";
const BACKUP_API = "https://api.api-store.workers.dev/api/fitlog";

async function getJSON(url) {
  // ১ ঘণ্টা পর পর ডাটা revalidate হবে
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

// API array বা { data: [...] } — যেকোনো শেপে দিলেও কাজ করবে
function toList(json) {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data)) return json.data;
  return [];
}

function toItem(json) {
  const item = json?.data ?? json;
  return item && item.id != null && item.name ? item : null;
}

export async function getWorkouts() {
  try {
    return toList(await getJSON(PRIMARY_API));
  } catch {
    // প্রধান API কাজ না করলে Alternative API
    return toList(await getJSON(BACKUP_API));
  }
}

export async function getWorkout(id) {
  for (const base of [PRIMARY_API, BACKUP_API]) {
    try {
      const item = toItem(await getJSON(`${base}/${id}`));
      if (item) return item;
    } catch {
      // পরের API চেষ্টা করবে
    }
  }

  // শেষ চেষ্টা: সব ডাটা এনে id দিয়ে খুঁজে বের করা
  try {
    const all = await getWorkouts();
    return all.find((w) => String(w.id) === String(id)) ?? null;
  } catch {
    return null;
  }
}
