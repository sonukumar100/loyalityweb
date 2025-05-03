import { Badge } from 'app/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from 'app/components/ui/tabs';
import { getStatusColorName, getStatusTextColorName } from 'utils/statusColor';

type UserTabsProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  paginationData?: {
    total: number;
    totalVerified: number;
    totalPending: number;
    totalRejected: number;
    totalSuspect: number;
  };
};

export const UserTabs = ({
  activeTab,
  setActiveTab,
  paginationData = {
    total: 0,
    totalVerified: 0,
    totalPending: 0,
    totalRejected: 0,
    totalSuspect: 0,
  },
}: UserTabsProps) => (
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
          {paginationData.total}
        </Badge>
      </TabsTrigger>
      <TabsTrigger
        value="1"
        className="rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-black"
        style={
          activeTab === '1'
            ? {
                backgroundColor: getStatusColorName('pending'),
                color: getStatusTextColorName('pending'),
              }
            : undefined
        }
      >
        Pending{' '}
        <Badge variant="outline" className="ml-1">
          {paginationData.totalPending}
        </Badge>
      </TabsTrigger>

      <TabsTrigger
        value="2"
        style={
          activeTab === '2'
            ? {
                backgroundColor: getStatusColorName('verified'),
                color: getStatusTextColorName('verified'),
              }
            : undefined
        }
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        Verified{' '}
        <Badge variant="outline" className="ml-1">
          {paginationData.totalVerified}
        </Badge>
      </TabsTrigger>
      <TabsTrigger
        value="3"
        style={
          activeTab === '3'
            ? {
                backgroundColor: getStatusColorName('rejected'),
                color: getStatusTextColorName('rejected'),
              }
            : undefined
        }
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        Rejected{' '}
        <Badge variant="outline" className="ml-1">
          {paginationData.totalRejected}
        </Badge>
      </TabsTrigger>
      <TabsTrigger
        value="4"
        style={
          activeTab === '4'
            ? {
                backgroundColor: getStatusColorName('suspect'),
                color: getStatusTextColorName('suspect'),
              }
            : undefined
        }
        className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md px-4 py-2"
      >
        Suspect{' '}
        <Badge variant="outline" className="ml-1">
          {paginationData.totalSuspect}
        </Badge>
      </TabsTrigger>
    </TabsList>
  </Tabs>
);
