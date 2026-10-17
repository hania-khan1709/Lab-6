async function fetchUser(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: Status ${response.status}`);
    }

    const user = await response.json();
    return user;

  } catch (error) {
    throw new Error(`Failed to retrieve user data: ${error.message}`);
  }
}

async function runTest() {
  try {
    console.log("Fetching user 1...");
    const user = await fetchUser(1);
    console.log("Success! User object:", user);
  } catch (error) {
    console.error("Error:", error.message);
  }

  try {
    console.log("\nFetching invalid user 9999...");
    await fetchUser(9999);
  } catch (error) {
    console.error("Caught error:", error.message);
  }
}

runTest();