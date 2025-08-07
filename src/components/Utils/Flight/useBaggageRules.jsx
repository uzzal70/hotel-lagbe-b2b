import { useMemo } from 'react';
const akBaggageRule = [
  { Value: '30', Unit: 'kg' },
  { Value: '30', Unit: 'kg' },
  { Value: '30', Unit: 'kg' },
];
const qrBaggageRule = [
  { Value: '46', Unit: 'kg' },
  { Value: '46', Unit: 'kg' },
  { Value: '46', Unit: 'kg' },
];
export function useBaggageRules(segment, code) {
  // useMemo for performance optimization (optional)
  return useMemo(() => {
    if (
      !Array.isArray(code === 'AK' ? akBaggageRule : qrBaggageRule) ||
      segment <= 0
    ) {
      return [];
    }
    return code === 'AK' ? akBaggageRule : qrBaggageRule.slice(0, segment);
  }, [segment]);
}
