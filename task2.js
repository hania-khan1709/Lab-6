async function fetchUserProfile(userId) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (userId <= 0) {
    throw new Error(`Invalid User ID: ${userId}`);
  }
  
  return { userId, name: "Ali", isActive: true };
}

async function fetchAccountStatus(accountId) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (accountId <= 0) {
    throw new Error(`Invalid Account ID: ${accountId}`);
  }
  
  return { accountId, status: "Verified" };
}

async function validateUserAndAccount(userId, accountId) {
  try {
    const [user, account] = await Promise.all([
      fetchUserProfile(userId),
      fetchAccountStatus(accountId)
    ]);

    if (!user.isActive || account.status !== "Verified") {
      throw new Error("Validation Failed: User is inactive or account is unverified.");
    }
    return {
      success: true,
      message: "All details are valid and verified!",
      user,
      account
    };

  } catch (error) {
    throw new Error(`Main Promise Rejected -> ${error.message}`);
  }
}

async function runTests() {
  console.log('--- Test 1: Both operations succeed with valid details ---');
  try {
    const result = await validateUserAndAccount(1, 101);
    console.log("Success Result:", result);
  } catch (error) {
    console.error("Error:", error.message);
  }

  console.log('\n--- Test 2: One operation fails (Triggering rejection via Promise.all) ---');
  try {
    await validateUserAndAccount(-1, 101);
  } catch (error) {
    console.error("Caught Expected Rejection:", error.message);
  }
}
runTests();