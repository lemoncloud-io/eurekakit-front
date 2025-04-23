import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Calendar,
    DollarSign,
    Download,
    Filter,
    ShoppingCart,
    Users,
} from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { Avatar, AvatarFallback } from '@lemon/ui-kit/components/ui/avatar';
import { Button } from '@lemon/ui-kit/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lemon/ui-kit/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@lemon/ui-kit/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lemon/ui-kit/components/ui/tabs';

const generateData = () => {
    // Current date info for realistic date ranges
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Generate last 6 months of data
    const months = [];
    for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const monthDate = new Date(currentYear, monthIndex, 1);
        months.push(monthDate.toLocaleString('default', { month: 'short' }));
    }

    // Generate revenue data with realistic trends (gradual increase with some variations)
    const baseRevenue = 30000 + Math.random() * 20000;
    const revenueData = months.map((month, index) => {
        // Create a general upward trend with some randomness
        const growthTrend = 1 + index * 0.05;
        const randomVariation = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
        const revenue = Math.round(baseRevenue * growthTrend * randomVariation);

        // Expenses are typically 50-70% of revenue
        const expenseRatio = 0.5 + Math.random() * 0.2;
        const expenses = Math.round(revenue * expenseRatio);

        return {
            name: month,
            revenue,
            expenses,
            profit: revenue - expenses,
        };
    });

    // Generate random products performance
    const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
    const productData = products.map(product => ({
        name: product,
        sales: Math.round(1000 + Math.random() * 4000),
        returns: Math.round(50 + Math.random() * 200),
    }));

    // Generate some realistic-looking transactions
    const names = ['James Smith', 'Mary Johnson', 'Robert Williams', 'Patricia Brown', 'John Davis', 'Jennifer Miller'];
    const statuses = ['completed', 'processing', 'failed'];

    const transactions = Array.from({ length: 5 }, (_, i) => {
        const user = names[Math.floor(Math.random() * names.length)];
        const initials = user
            .split(' ')
            .map(n => n[0])
            .join('');
        const amount = Math.round(50 + Math.random() * 450);
        const status = statuses[Math.floor(Math.random() * (i === 0 ? 2 : 3))]; // Make first one always completed or processing

        // Generate realistic timestamp (within past 24 hours)
        const hoursAgo = Math.floor(Math.random() * 24);
        const minutesAgo = Math.floor(Math.random() * 60);
        let timeAgo;

        if (hoursAgo === 0) {
            timeAgo = `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
        } else {
            timeAgo = `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
        }

        return {
            id: i + 1,
            user,
            avatar: initials,
            amount: `$${amount.toFixed(2)}`,
            status,
            date: timeAgo,
        };
    });

    // Generate key metrics
    const lastMonthRevenue = revenueData[revenueData.length - 2].revenue;
    const currentRevenue = revenueData[revenueData.length - 1].revenue;
    const revenueGrowth = ((currentRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

    const baseUsers = 2000 + Math.floor(Math.random() * 500);
    const userGrowth = Math.floor(50 + Math.random() * 200);
    const currentUsers = baseUsers + userGrowth;

    const baseSales = 10000 + Math.floor(Math.random() * 5000);
    const salesGrowth = (Math.random() * 20 + 5).toFixed(1);
    const currentSales = baseSales * (1 + parseFloat(salesGrowth) / 100);

    const activeUsers = Math.floor(400 + Math.random() * 300);
    const activeUsersChange = Math.random() > 0.7 ? 'down' : 'up'; // Mostly up, sometimes down

    return {
        stats: [
            {
                key: 'revenue',
                value: currentRevenue,
                percent: revenueGrowth.toFixed(1),
                trend: revenueGrowth > 0 ? 'up' : 'down',
                icon: DollarSign,
            },
            {
                key: 'subscribers',
                value: currentUsers,
                count: userGrowth,
                trend: 'up',
                icon: Users,
            },
            {
                key: 'sales',
                value: Math.round(currentSales),
                percent: salesGrowth,
                trend: 'up',
                icon: ShoppingCart,
            },
            {
                key: 'activeUsers',
                value: activeUsers,
                trend: activeUsersChange,
                icon: Activity,
            },
        ],
        revenueData,
        productData,
        transactions,
    };
};

export const DashboardPage = () => {
    const { i18n, t } = useTranslation();
    const [data, setData] = useState(null);
    const [timeframe, setTimeframe] = useState('week');

    useEffect(() => {
        setData(generateData());
    }, []);

    const handleTimeframeChange = value => {
        setTimeframe(value);
        setData(generateData());
    };

    const formatCurrency = value => {
        const locale = i18n.language === 'ko' ? 'ko-KR' : 'en-US';
        const currency = i18n.language === 'ko' ? 'KRW' : 'USD';

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatNumber = value => {
        const locale = i18n.language === 'ko' ? 'ko-KR' : 'en-US';
        return new Intl.NumberFormat(locale).format(value);
    };

    if (!data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-lg">Loading dashboard data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top navigation bar */}
            <header className="sticky top-0 z-10 border-b bg-white px-6 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">{t('dashboard.title')}</h1>
                    <div className="ml-auto flex items-center gap-4">
                        <Select value={timeframe} onValueChange={handleTimeframeChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="day">{t('timeframe.day')}</SelectItem>
                                <SelectItem value="week">{t('timeframe.week')}</SelectItem>
                                <SelectItem value="month">{t('timeframe.month')}</SelectItem>
                                <SelectItem value="quarter">{t('timeframe.quarter')}</SelectItem>
                                <SelectItem value="year">{t('timeframe.year')}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            {t('dashboard.exportReport')}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="container mx-auto px-4 py-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">{t('dashboard.analyticsOverview')}</h2>
                        <p className="text-slate-500">{t('dashboard.monitorPerformance')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            {t('timeframe.dateRange', {
                                startMonth: data.revenueData[0].name,
                                endMonth: data.revenueData[data.revenueData.length - 1].name,
                            })}
                        </Button>
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            {t('dashboard.filters')}
                        </Button>
                    </div>
                </div>

                {/* Stats cards */}
                <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {data.stats.map(stat => (
                        <Card key={stat.key} className="overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{t(`stats.${stat.key}.title`)}</CardTitle>
                                <div className="rounded-full bg-slate-100 p-2">
                                    <stat.icon className="h-4 w-4 text-slate-700" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {stat.key === 'revenue' ? formatCurrency(stat.value) : formatNumber(stat.value)}
                                </div>
                                <div className="flex items-center text-xs text-slate-500">
                                    {stat.trend === 'up' ? (
                                        <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                                    ) : (
                                        <ArrowDownRight className="mr-1 h-4 w-4 text-rose-500" />
                                    )}
                                    {stat.key === 'revenue' || stat.key === 'sales'
                                        ? t(`stats.${stat.key}.description`, { percent: stat.percent })
                                        : stat.key === 'subscribers'
                                          ? t(`stats.${stat.key}.description`, { count: formatNumber(stat.count) })
                                          : t(`stats.${stat.key}.description`)}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts section */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="overview">{t('charts.tabs.overview')}</TabsTrigger>
                        <TabsTrigger value="revenue">{t('charts.tabs.revenue')}</TabsTrigger>
                        <TabsTrigger value="products">{t('charts.tabs.products')}</TabsTrigger>
                        <TabsTrigger value="customers">{t('charts.tabs.customers')}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Revenue chart */}
                            <Card className="col-span-2 lg:col-span-1">
                                <CardHeader>
                                    <CardTitle>{t('charts.revenue.title')}</CardTitle>
                                    <CardDescription>{t('charts.revenue.description')}</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={data.revenueData}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip
                                                formatter={value => [formatCurrency(value), undefined]}
                                                labelFormatter={label => `${label}`}
                                            />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="#8884d8"
                                                strokeWidth={2}
                                                name={t('charts.revenue.series.revenue')}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="expenses"
                                                stroke="#82ca9d"
                                                strokeWidth={2}
                                                name={t('charts.revenue.series.expenses')}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="profit"
                                                stroke="#ff7300"
                                                strokeWidth={2}
                                                name={t('charts.revenue.series.profit')}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Product performance */}
                            <Card className="col-span-2 lg:col-span-1">
                                <CardHeader>
                                    <CardTitle>{t('charts.products.title')}</CardTitle>
                                    <CardDescription>{t('charts.products.description')}</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={data.productData}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip formatter={value => [formatNumber(value), undefined]} />
                                            <Legend />
                                            <Bar
                                                dataKey="sales"
                                                fill="#8884d8"
                                                name={t('charts.products.series.sales')}
                                            />
                                            <Bar
                                                dataKey="returns"
                                                fill="#ff7300"
                                                name={t('charts.products.series.returns')}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Transactions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('transactions.title')}</CardTitle>
                                <CardDescription>{t('transactions.description')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {data.transactions.map(transaction => (
                                        <div
                                            key={transaction.id}
                                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                                        >
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarFallback>{transaction.avatar}</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <p className="font-medium">{transaction.user}</p>
                                                    <p className="text-sm text-slate-500">{transaction.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    {i18n.language === 'ko'
                                                        ? transaction.amount.replace('$', '₩')
                                                        : transaction.amount}
                                                </p>
                                                <p
                                                    className={`text-sm ${
                                                        transaction.status === 'completed'
                                                            ? 'text-emerald-500'
                                                            : transaction.status === 'processing'
                                                              ? 'text-amber-500'
                                                              : 'text-rose-500'
                                                    }`}
                                                >
                                                    {t(`transactions.status.${transaction.status}`)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="revenue" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('charts.tabs.revenue')}</CardTitle>
                                <CardDescription>{t('charts.revenue.description')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-500">{t('placeholders.revenue')}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="products" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('charts.tabs.products')}</CardTitle>
                                <CardDescription>{t('charts.products.description')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-500">{t('placeholders.products')}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="customers" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('charts.tabs.customers')}</CardTitle>
                                <CardDescription>{t('transactions.description')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-500">{t('placeholders.customers')}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};
