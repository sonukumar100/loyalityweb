import { Badge } from 'app/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from 'app/components/ui/tabs';

type CouponTabsProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  allCount: string;
  totalScanned: string;
  totalAvailable: string;
};

export const CouponTabs = ({
  activeTab,
  setActiveTab,
  allCount,
  totalScanned,
  totalAvailable,
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
        Scanned by User{' '}
        <Badge variant="outline" className="ml-1">
          {totalScanned}
        </Badge>
      </TabsTrigger>
      <TabsTrigger
        value="group"
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        Code Summery{' '}
        <Badge variant="outline" className="ml-1">
          {totalAvailable}
        </Badge>
      </TabsTrigger>
    </TabsList>
  </Tabs>
);
