interface EmailCheckResponse {
  exists: boolean;
}

export const checkIfEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`/checkEmail.json`, {
      method: "POST",
      body: JSON.stringify({ email })
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: EmailCheckResponse = await response.json();
    return data.exists;
  } catch (error) {
    alert(`Error checking email: ${error}`);
    return false;
  }
};
