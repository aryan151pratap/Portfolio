const apiUrl = import.meta.env.VITE_BACKEND_ADD;

export async function saveProject(route, data) {
  try {
    const res = await fetch(`${apiUrl}/${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error saving project:", error);
    throw error;
  }
}

export async function getProject(route) {
  try {
    const res = await fetch(`${apiUrl}/${route}`, {
      method: "GET",
      credentials: "include",
    });

    const result = await res.json();
    return { ok: res.ok, result };;
  } catch (error) {
    console.error("Error saving project:", error);
    throw error;
  }
}

export async function deleteProject(route) {
  try {
    const res = await fetch(`${apiUrl}/${route}`, {
      method: "DELETE",
      credentials: "include",
    });

    const result = await res.json();
    return { ok: res.ok, result };
  } catch (error) {
    console.error("Error saving project:", error);
    throw error;
  }
}

export async function Logout() {
  try {
    const res = await fetch(`${apiUrl}/auth/logout`, {
      method: "DELETE",
      credentials: "include",
    });

    const result = await res.json();
    return { ok: res.ok, result };
  } catch (error) {
    console.error("Error saving project:", error);
    throw error;
  }
}