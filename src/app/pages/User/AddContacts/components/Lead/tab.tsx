import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from 'app/components/ui/card';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from 'app/components/ui/tabs';

import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';
import { Label } from 'app/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from 'app/components/ui/sheet';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from 'app/components/ui/select';
import { ChevronLeft, Upload } from 'lucide-react';
import { LeadAddressInfo } from './lead-address-info';
import { AddLeadFormThree } from './add-lead-form-three';
import { AddLeadFormProfile } from './add-lead-form-profile';
import { Communcation } from './communcation';
import { Test } from './test';
import { LeadFormContext } from './leadFormContext';

export function Tab() {
    return (
        <div className="mt-12">
            <Tabs defaultValue="account">
                <TabsList className="flex justify-start space-x-3 ">
                    <TabsTrigger value="account">
                        {' '}
                        <img src="/images/star.svg" />
                    </TabsTrigger>
                    <TabsTrigger value="Communication">
                        {' '}
                        <img src="/images/tab3.svg" />
                    </TabsTrigger>
                    <TabsTrigger value="Tasks">
                        {' '}
                        <img src="/images/tab4.svg" />
                    </TabsTrigger>
                    <TabsTrigger value="Loans">
                        <img src="/images/tab5.svg" />
                    </TabsTrigger>
                    <TabsTrigger value="Loan-Inquiry">
                        {' '}
                        <img src="/images/tab2.svg" />
                    </TabsTrigger>
                    <TabsTrigger value="Activity">
                        {' '}
                        <img src="/images/tab6.svg" />
                    </TabsTrigger>
                    <TabsTrigger value="Note">
                        {' '}
                        <img src="/images/tab7.svg" />
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    {/* <Test /> */}

                </TabsContent>

                <Communcation />

                <TabsContent value="Tasks">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2"></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="Loans">
                    <Card>
                        <CardHeader>
                            <CardTitle>Loans</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2"></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="Loan-Inquiry">
                    <Card>
                        <CardHeader>
                            <CardTitle>Loan Inquiry Tab</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2"></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="Activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2"></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="Note">
                    <Card>
                        <CardHeader>
                            <CardTitle>Note</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2"></CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}