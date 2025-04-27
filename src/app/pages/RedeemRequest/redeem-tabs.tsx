import { Badge } from 'app/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from 'app/components/ui/tabs';
import {
  getStatusColor,
  getStatusTextColor,
  getTabColor,
} from 'utils/statusColor';

type RedeemTabsProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  allCount: string;
  Pending: string;
  Reject: string;
  Approved: string;
};

export const RedeemTabs = ({
  activeTab,
  setActiveTab,
  allCount,
  Pending,
  Reject,
  Approved,
}: RedeemTabsProps) => (
  <Tabs
    defaultValue="all"
    className="w-auto filter-all-tab"
    onValueChange={setActiveTab}
  >
    <TabsList className="gap-8 bg-muted p-1 rounded-md">
      {/* All Tab */}
      <TabsTrigger
        value="all"
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        All{' '}
        <Badge variant="outline" className="ml-1">
          {allCount}
        </Badge>
      </TabsTrigger>

      {/* Pending Tab */}
      <TabsTrigger
        value="pending"
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        Pending{' '}
        <Badge
          variant="outline"
          style={{
            backgroundColor: getStatusColor('0'),
            color: getStatusTextColor('0'),
          }}
        >
          {Pending || 0}
        </Badge>
      </TabsTrigger>

      {/* Approved Tab */}
      <TabsTrigger
        value="approved"
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        Approved{' '}
        <Badge
          variant="outline"
          style={{
            backgroundColor: getStatusColor('1'),
            color: getStatusTextColor('1'),
          }}
        >
          {Approved || 0}
        </Badge>
      </TabsTrigger>

      {/* Reject Tab */}
      <TabsTrigger
        value="reject"
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        Reject{' '}
        <Badge
          variant="outline"
          style={{
            backgroundColor: getStatusColor('2'),
            color: getStatusTextColor('2'),
          }}
        >
          {Reject || 0}
        </Badge>
      </TabsTrigger>
    </TabsList>
  </Tabs>
);
