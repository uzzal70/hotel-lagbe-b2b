export const convertToSegments = (data = []) => {
  return data?.reduce((acc, current) => {
    const lastGroup = acc.length > 0 ? acc[acc.length - 1] : null;

    if (lastGroup && lastGroup[0].group === current.group) {
      // If the current item matches the last group's "group" field, add it to that group
      lastGroup.push(current);
    } else {
      // Otherwise, start a new group
      acc.push([current]);
    }
    return acc;
  }, []);
};
