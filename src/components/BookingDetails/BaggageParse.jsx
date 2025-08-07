export const BaggageParse = (baggageRuleString) => {
  let parsedBaggageRule = [];

  try {
    parsedBaggageRule = baggageRuleString ? JSON.parse(baggageRuleString) : [];

    // Log parsed value for debugging

    // Check if the parsed object is an array
    if (!Array.isArray(parsedBaggageRule)) {
      parsedBaggageRule = [];
    }
  } catch (error) {
    parsedBaggageRule = [];
  }

  // Ensure map is only called on an array
  if (Array.isArray(parsedBaggageRule)) {
    return parsedBaggageRule.map((item) => {
      const Value = item?.Value ?? '0';
      const Unit = item?.Unit ?? '';
      return { Value, Unit };
    });
  } else {
    return []; // Return empty array if parsedBaggageRule is not an array
  }
};

export const MealParse = (baggageRuleString) => {
  let parsedBaggageRule = [];

  try {
    parsedBaggageRule = baggageRuleString ? JSON.parse(baggageRuleString) : [];

    // Check if the parsed object is an array
    if (!Array.isArray(parsedBaggageRule)) {
      parsedBaggageRule = [];
    }
  } catch (error) {
    parsedBaggageRule = [];
  }

  // Ensure map is only called on an array
  if (Array.isArray(parsedBaggageRule)) {
    return parsedBaggageRule.map((item) => {
      const Meal = item?.Meal ?? '';
      return { Meal };
    });
  } else {
    return []; // Return empty array if parsedBaggageRule is not an array
  }
};
