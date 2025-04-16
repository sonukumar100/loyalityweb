import GiftForm from './add-gift';
import { GiftList } from './gift-list';

export const GiftIndex = () => {
  return (
    <div>
      <GiftList />
      <GiftForm />
    </div>
  );
};
