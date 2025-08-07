/* eslint-disable react/prop-types */
import { Text, View } from '@react-pdf/renderer';
import { BaggageParse } from '../BaggageParse';

const BaggagePdf = ({ item }) => {
  const baggageAllowances = BaggageParse(item.baggageRule);
  const extraBaggage = BaggageParse(item.extraBaggage);

  return (
    <View>
      <Text>
        {baggageAllowances.map((baggage, index) => {
          const extra = extraBaggage?.[index];
          return `${baggage.Value}${baggage.Unit}${
            extra ? ` + ${extra.Value}${extra.Unit}` : ''
          }${index < baggageAllowances?.length - 1 ? ', ' : ''}`;
        })}
      </Text>
    </View>
  );
};

export default BaggagePdf;
