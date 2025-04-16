import GiftForm from './add-gift';
import { GiftList } from './gift-list';

export const GiftIndex = () => {
  return (
    <div>
      <GiftList />
      <div className="fixed bottom-4 right-4 z-50">
        <GiftForm />
      </div>
    </div>
  );
};
