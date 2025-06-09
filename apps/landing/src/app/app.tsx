import { useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { ChevronRight } from 'lucide-react';

import { Images } from '@lemon/assets';
import { cn } from '@lemon/ui-kit/lib/utils';

import { RadialGradient } from './components';

export function App() {
    const ref = useRef<HTMLDivElement>(null);
    const { i18n } = useTranslation();

    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ko' : 'en');
    };

    useEffect(() => {
        let angle = 0;
        let frameId: number;

        const animate = () => {
            angle = (angle + 1) % 360;
            if (ref.current) {
                ref.current.style.setProperty('--angle', `${angle}deg`);
            }
            frameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="text-background flex flex-col items-center bg-[#0F0F10]">
            <div className="relative flex h-[720px] w-full flex-col items-center justify-center gap-10 overflow-x-hidden bg-[#1B1B1B]/50">
                <div className="absolute top-4 flex h-[60px] w-full max-w-[1180px] items-center rounded-lg bg-[#1b1b1b] px-4">
                    <img src={Images.eurekaCodesLogo} className="h-6" />
                    <button className="ml-auto h-6" onClick={changeLanguage}>
                        <img src={Images.globe} />
                    </button>
                </div>
                <p className="text-center text-[52px] leading-tight">
                    <Trans
                        i18nKey="<strong>EurekaKit</strong> provides app and<br/>backend code to help you build your MVP quickly."
                        components={{
                            strong: <strong className="text-[86px]" />,
                            br: <br />,
                        }}
                    />
                </p>
                <p className="flex flex-col text-center text-[24px]">
                    <Trans
                        i18nKey="It helps you quickly build optimized products with a React Native app,<br />and even non-developers can easily create customized services."
                        components={{
                            br: <br />,
                        }}
                    />
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
                <p className="text-[44px] leading-tight">
                    <Trans
                        i18nKey="To use EurekaKit, please start by using<br/><strong>EurekaCodes</strong> first"
                        components={{
                            strong: <strong className="text-[58px]" />,
                            br: <br />,
                        }}
                    />
                </p>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <p className="relative col-span-2 flex h-[682px] flex-col gap-8 overflow-hidden rounded-3xl bg-white/[0.03] px-24 pt-24">
                        <span className="text-4xl">
                            <Trans i18nKey={`It provides a default workspace and project for you`} />
                        </span>
                        <span>
                            <Trans
                                i18nKey={`You can try out Eurekacodes with the default workspace and project provided`}
                            />
                        </span>
                        <img src={Images.landingBannder1} className="absolute bottom-0 w-4/5" />
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
                            <Trans
                                i18nKey="Try applying for the<br/>EurekaKit service<br/>from the catalog"
                                components={{
                                    br: <br />,
                                }}
                            />
                        </span>
                        <span>
                            <Trans
                                i18nKey="You can find and apply for the service you<br/>need from a variety of available options"
                                components={{
                                    br: <br />,
                                }}
                            />
                        </span>
                        <img src={Images.landingBannder2} className="absolute bottom-0 right-0 w-10/12" />
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
                            <Trans
                                i18nKey="Try using the<br/>EurekaKit<br/>service with ease"
                                components={{
                                    br: <br />,
                                }}
                            />
                        </span>
                        <span>
                            <Trans
                                i18nKey="After applying with a React Native app, you can build<br/>your product faster and customize it to your needs."
                                components={{
                                    br: <br />,
                                }}
                            />
                        </span>
                        <img src={Images.landingBannder3} className="absolute bottom-0 right-0 w-10/12" />
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
                    <div
                        ref={ref}
                        className={cn(
                            'relative flex w-[954px] items-center rounded-full p-[2px]',
                            'rotating-gradient',
                            'after:absolute after:h-full after:w-full after:rounded-full',
                            'after:z-0 after:bg-gradient-to-br after:from-[#FFE015]/40 after:from-20% after:via-[#FF8432]/40 after:via-40% after:to-[#B313E9]/40 after:to-80% after:opacity-20 after:blur-xl'
                        )}
                    >
                        <div className="z-10 flex w-[954px] items-center rounded-full bg-[#161617] py-5 pl-10 pr-5">
                            <span className="text-[30px]">
                                <Trans i18nKey={'Apply for EurekaKit and try using it'} />
                            </span>
                            <a
                                href="https://eureka.codes/"
                                className="ml-auto inline-flex gap-2 rounded-full bg-white/[0.07] py-4 pl-8 pr-5 text-[24px] hover:bg-white/10"
                            >
                                <Trans i18nKey={'Apply for the Kit'} />
                                <ChevronRight className="!h-auto !w-auto" size={28} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-muted-foreground flex h-[638px] flex-col items-center justify-center gap-8">
                    <div className="h-8">
                        <img src={Images.eurekaCodesLogo} className="h-full" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span>© 2025 LemonCloud, Inc. All rights reserved.</span>
                        <span>Privacy & Terms</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
