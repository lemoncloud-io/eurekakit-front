import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    DollarSign,
    Download,
    ShoppingBag,
    Users,
} from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader } from '@lemon/ui-kit/components/ui/card';

const stats = [
    {
        title: '총 수익',
        value: '₩45,231,000',
        description: '전월 대비 +20.1%',
        trend: 'up',
        icon: DollarSign,
    },
    {
        title: '구독자',
        value: '2,350',
        description: '전월 대비 +180',
        trend: 'up',
        icon: Users,
    },
    {
        title: '판매량',
        value: '12,234',
        description: '전월 대비 +19%',
        trend: 'up',
        icon: ShoppingBag,
    },
    {
        title: '활성 사용자',
        value: '573',
        description: '실시간 접속자',
        trend: 'down',
        icon: Activity,
    },
];

const revenueData = [
    { name: '1월', value: 35000000 },
    { name: '2월', value: 38000000 },
    { name: '3월', value: 42000000 },
    { name: '4월', value: 45231000 },
];

const recentTransactions = [
    { id: 1, user: '김철수', amount: '₩125,000', status: '완료', date: '2024-04-15' },
    { id: 2, user: '이영희', amount: '₩89,000', status: '처리중', date: '2024-04-15' },
    { id: 3, user: '박지민', amount: '₩230,000', status: '완료', date: '2024-04-14' },
    { id: 4, user: '최유진', amount: '₩67,000', status: '완료', date: '2024-04-14' },
];

export const DashboardPage = () => {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
                <button className="focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    <Download className="mr-2 h-4 w-4" />
                    리포트 다운로드
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map(stat => (
                    <Card key={stat.title} className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="text-sm font-medium">{stat.title}</div>
                            <div className="bg-primary/10 rounded-full p-2">
                                <stat.icon className="text-primary h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-muted-foreground flex items-center text-xs">
                                {stat.trend === 'up' ? (
                                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                                )}
                                {stat.description}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <h3 className="text-lg font-medium">매출 추이</h3>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                    formatter={value =>
                                        new Intl.NumberFormat('ko-KR', {
                                            style: 'currency',
                                            currency: 'KRW',
                                        }).format(value)
                                    }
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    dot={{ fill: '#2563eb' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <h3 className="text-lg font-medium">최근 거래</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentTransactions.map(transaction => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">{transaction.user}</p>
                                        <p className="text-muted-foreground text-xs">{transaction.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{transaction.amount}</p>
                                        <p
                                            className={`text-xs ${
                                                transaction.status === '완료' ? 'text-green-500' : 'text-yellow-500'
                                            }`}
                                        >
                                            {transaction.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
