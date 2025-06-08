import { ChevronRight } from 'lucide-react';

import { Button } from '@lemon/ui-kit/components/ui/button';

import { RadialGradient } from './components';

export function App() {
    return (
        <div className="text-background flex flex-col items-center bg-[#0F0F10]">
            <div className="relative flex h-[720px] w-full flex-col items-center justify-center gap-10 overflow-x-hidden bg-white/[0.03]">
                <div className="absolute top-4 flex h-[60px] w-full max-w-[1180px] items-center rounded-lg bg-[#1b1b1b] px-4">
                    Hello
                </div>
                <p className="flex flex-col text-center text-[52px] leading-tight">
                    <span>
                        <strong className="text-[86px]">EurekaKit</strong> 는 앱과 백엔드 코드를 제공해
                    </span>
                    <span>MVP 개발을 빠르게 도와줍니다.</span>
                </p>
                <p className="flex flex-col text-center text-[24px]">
                    <span>React Native 앱으로 최적화 제품을 빠르게 구축할 수 있도록 지원해주며</span>
                    <span>개발자가 아닌 사람도 맞춤형 서비스를 쉽게 구현할 수 있습니다.</span>
                </p>
                <RadialGradient
                    radius={300}
                    colorStops={[
                        { position: '0%', color: 'rgba(19, 46, 180, 0.3)' },
                        { position: '30%', color: 'rgba(19, 46, 180, 0.2)' },
                        { position: '60%', color: 'rgba(19, 46, 180, 0.1)' },
                        { position: '90%', color: 'rgba(19, 46, 180, 0)' },
                    ]}
                    className="absolute -left-10 -top-32 opacity-50"
                />
                <RadialGradient
                    radius={300}
                    colorStops={[
                        { position: '0%', color: 'rgba(167, 65, 255, 0.5)' },
                        { position: '30%', color: 'rgba(143, 25, 246, 0.2)' },
                        { position: '60%', color: 'rgba(143, 25, 246, 0.1)' },
                        { position: '90%', color: 'rgba(143, 25, 246, 0)' },
                    ]}
                    className="absolute -top-10 opacity-20"
                />
                <RadialGradient
                    radius={300}
                    colorStops={[
                        { position: '1%', color: 'rgba(255, 200, 19, 0.3)' },
                        { position: '51%', color: 'rgba(255, 200, 19, 0.2)' },
                        { position: '60%', color: 'rgba(255, 200, 19, 0.1)' },
                        { position: '90%', color: 'rgba(255, 200, 19, 0)' },
                    ]}
                    className="absolute -right-32 -top-44 opacity-20"
                />
            </div>
            <div className="mt-24 flex max-w-[1180px] flex-col gap-12">
                <p className="flex flex-col text-[44px] leading-tight">
                    <span>EurekaKit를 이용하려면</span>
                    <span>
                        <strong className="text-[58px]">EurekaCodes</strong>를 먼저 사용해 주세요
                    </span>
                </p>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <p className="relative col-span-2 flex h-[682px] flex-col gap-8 overflow-hidden rounded-3xl bg-white/[0.03] px-24 pt-24">
                        <span className="text-4xl">기본 워크스페이스와 프로젝트를 제공해줘요</span>
                        <span>기본으로 제공되는 워크스페이스와 프로젝트로 유레카코즈를 이용해볼 수 있어요</span>
                        <RadialGradient
                            radius={300}
                            colorStops={[
                                { position: '0%', color: 'rgba(19, 46, 180, 0.3)' },
                                { position: '30%', color: 'rgba(19, 46, 180, 0.2)' },
                                { position: '60%', color: 'rgba(19, 46, 180, 0.1)' },
                                { position: '90%', color: 'rgba(19, 46, 180, 0)' },
                            ]}
                            className="absolute -left-40 -top-32 opacity-50"
                        />
                        <RadialGradient
                            radius={300}
                            colorStops={[
                                { position: '0%', color: 'rgba(167, 65, 255, 0.5)' },
                                { position: '30%', color: 'rgba(143, 25, 246, 0.2)' },
                                { position: '60%', color: 'rgba(143, 25, 246, 0.1)' },
                                { position: '90%', color: 'rgba(143, 25, 246, 0)' },
                            ]}
                            className="absolute -bottom-48 -right-44 opacity-20"
                        />
                        <RadialGradient
                            radius={300}
                            colorStops={[
                                { position: '1%', color: 'rgba(255, 200, 19, 0.3)' },
                                { position: '51%', color: 'rgba(255, 200, 19, 0.2)' },
                                { position: '60%', color: 'rgba(255, 200, 19, 0.1)' },
                                { position: '90%', color: 'rgba(255, 200, 19, 0)' },
                            ]}
                            className="absolute -right-40 -top-48 opacity-10"
                        />
                    </p>
                    <p className="relative flex h-[682px] flex-col gap-8 overflow-hidden rounded-3xl bg-white/[0.03] px-16 pt-16">
                        <span className="text-4xl">
                            카탈로그에서 EurekaKit
                            <br />
                            서비스를 신청해보세요
                        </span>
                        <span>
                            다양한 서비스 중 나에게 필요한
                            <br />
                            서비스를 찾아 신청할 수 있어요
                        </span>
                        <RadialGradient
                            radius={240}
                            colorStops={[
                                { position: '0%', color: 'rgba(167, 65, 255, 0.5)' },
                                { position: '30%', color: 'rgba(143, 25, 246, 0.2)' },
                                { position: '60%', color: 'rgba(143, 25, 246, 0.1)' },
                                { position: '90%', color: 'rgba(143, 25, 246, 0)' },
                            ]}
                            className="absolute -left-48 -top-48 opacity-20"
                        />
                        <RadialGradient
                            radius={240}
                            colorStops={[
                                { position: '1%', color: 'rgba(255, 200, 19, 0.3)' },
                                { position: '51%', color: 'rgba(255, 200, 19, 0.2)' },
                                { position: '60%', color: 'rgba(255, 200, 19, 0.1)' },
                                { position: '90%', color: 'rgba(255, 200, 19, 0)' },
                            ]}
                            className="absolute -bottom-48 -right-40 opacity-10"
                        />
                    </p>
                    <p className="relative flex h-[682px] flex-col gap-8 overflow-hidden break-words rounded-3xl bg-white/[0.03] px-16 pt-16">
                        <span className="text-4xl">
                            EurekaKit 서비스를
                            <br />
                            쉽게 사용해 보세요
                        </span>
                        <span>
                            React Native 앱으로 신청 후 더욱 빠르게
                            <br />
                            제품을 구축하고 맞춤형으로 사용할 수 있습니다.
                        </span>
                        <RadialGradient
                            radius={240}
                            colorStops={[
                                { position: '1%', color: 'rgba(255, 200, 19, 0.3)' },
                                { position: '51%', color: 'rgba(255, 200, 19, 0.2)' },
                                { position: '60%', color: 'rgba(255, 200, 19, 0.1)' },
                                { position: '90%', color: 'rgba(255, 200, 19, 0)' },
                            ]}
                            className="absolute -right-40 -top-48 opacity-10"
                        />
                        <RadialGradient
                            radius={240}
                            colorStops={[
                                { position: '0%', color: 'rgba(255, 255, 255, 0.5)' },
                                { position: '30%', color: 'rgba(255, 255, 255, 0.1)' },
                                { position: '50%', color: 'rgba(255, 255, 255, 0.05)' },
                                { position: '90%', color: 'rgba(255, 255, 255, 0)' },
                            ]}
                            className="absolute -left-96 bottom-0 opacity-20"
                        />
                    </p>
                </div>
                <div className="flex h-[426px] items-end justify-center">
                    <div className="flex w-[954px] items-center rounded-full border border-white bg-white/[0.03] py-5 pl-10 pr-5">
                        <span className="text-[30px]">EurekaKit를 신청하고 사용해 보세요</span>
                        <Button className="ml-auto rounded-full bg-white/[0.07] py-6 pl-8 text-[24px] hover:bg-white/10">
                            <span>Kit 신청하러 가기</span>
                            <ChevronRight className="!h-auto !w-auto" size={24} />
                        </Button>
                    </div>
                </div>
                <div className="text-muted-foreground flex h-[638px] flex-col items-center justify-center">
                    <span>© 2025 LemonCloud, Inc. All rights reserved.</span>
                    <span>Privacy & Terms</span>
                </div>
            </div>
        </div>
    );
}

export default App;
