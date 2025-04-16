import { Badge } from 'app/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from 'app/components/ui/tabs';

type CouponTabsProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  allCount: number;
  activeCount: number;
  inactiveCount: number;
};

export const CouponTabs = ({
  activeTab,
  setActiveTab,
  allCount,
  activeCount,
  inactiveCount,
}: CouponTabsProps) => (
  <Tabs
    defaultValue="all"
    className="w-auto filter-all-tab"
    onValueChange={setActiveTab}
  >
    <TabsList className="gap-8 bg-muted p-1 rounded-md">
      <TabsTrigger
        value="all"
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        All{' '}
        <Badge variant="outline" className="ml-1">
          {allCount}
        </Badge>
      </TabsTrigger>
      <TabsTrigger
        value="active"
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        Active{' '}
        <Badge variant="outline" className="ml-1">
          {activeCount}
        </Badge>
      </TabsTrigger>
      <TabsTrigger
        value="inactive"
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        Deactive{' '}
        <Badge variant="outline" className="ml-1">
          {inactiveCount}
        </Badge>
      </TabsTrigger>
    </TabsList>
  </Tabs>
);
