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
        <div className="text-background relative flex w-full flex-col items-center overflow-x-hidden bg-[#0F0F10]">
            <div className="absolute left-0 right-0 top-0 z-0 h-[890px]">
                <img src={Images.landingBg} className="h-full" />
            </div>
            <div className="flex w-full max-w-[1228px] flex-1 flex-col items-center pb-[168px] max-md:pb-[80px]">
                <div className="fixed top-[14px] z-[999] w-full px-6">
                    <div className="flex h-[60px] items-center rounded-[18px] bg-[#1B1B1B]/[0.56] px-4 backdrop-blur-[13px]">
                        <img src={Images.eurekaCodesLogo} className="h-7" />
                        <button className="ml-auto h-6" onClick={changeLanguage}>
                            <img src={Images.globe} />
                        </button>
                    </div>
                </div>
                <div className="relative flex w-full max-w-[1228px] flex-col items-center justify-center gap-11 px-6 pb-[188px] pt-[228px] max-md:gap-6 max-md:pb-[90px] max-md:pt-[120px]">
                    <p className="relative z-10 text-center text-[52px] leading-tight text-white/[0.86] max-md:text-[36px] max-md:leading-tight">
                        <Trans
                            i18nKey="<strong>EurekaKit</strong> provides app and<br/>backend code to help you build your MVP quickly."
                            components={{
                                strong: <strong className="text-[86px] text-white max-md:text-[48px]" />,
                                br: <br />,
                            }}
                        />
                    </p>
                    <p className="flex flex-col text-center text-[24px] max-md:text-[18px]">
                        <Trans
                            i18nKey="It helps you quickly build optimized products with a React Native app,<br />and even non-developers can easily create customized services."
                            components={{
                                br: <br />,
                            }}
                        />
                    </p>

                    {/* <RadialGradient
                        radius={300}
                        colorStops={[
                            { position: '0%', color: 'rgba(19, 46, 180, 0.3)' },
                            { position: '30%', color: 'rgba(19, 46, 180, 0.2)' },
                            { position: '60%', color: 'rgba(19, 46, 180, 0.1)' },
                            { position: '90%', color: 'rgba(19, 46, 180, 0)' },
                        ]}
                        className="absolute -left-10 -top-32 opacity-60 blur-md"
                    />
                    <RadialGradient
                        radius={300}
                        colorStops={[
                            { position: '0%', color: 'rgba(167, 65, 255, 0.5)' },
                            { position: '30%', color: 'rgba(143, 25, 246, 0.2)' },
                            { position: '60%', color: 'rgba(143, 25, 246, 0.1)' },
                            { position: '90%', color: 'rgba(143, 25, 246, 0)' },
                        ]}
                        className="absolute -top-10 opacity-30 blur-md"
                    />
                    <RadialGradient
                        radius={300}
                        colorStops={[
                            { position: '1%', color: 'rgba(255, 200, 19, 0.3)' },
                            { position: '51%', color: 'rgba(255, 200, 19, 0.2)' },
                            { position: '60%', color: 'rgba(255, 200, 19, 0.1)' },
                            { position: '90%', color: 'rgba(255, 200, 19, 0)' },
                        ]}
                        className="absolute -right-32 -top-44 opacity-30 blur-md"
                    /> */}
                </div>
            </div>

            <div className="w-full max-w-[1228px] px-6">
                <p className="pb-[54px] text-[44px] leading-tight text-white/[0.86] max-md:pb-[30px] max-md:text-[32px] max-md:leading-tight">
                    <Trans
                        i18nKey="To use EurekaKit, please start by using<br/><strong>EurekaCodes</strong> first"
                        components={{
                            strong: <strong className="text-[58px] text-white max-md:text-[40px]" />,
                            br: <br />,
                        }}
                    />
                </p>
                <div className="grid grid-cols-2 gap-9 max-md:grid-cols-1">
                    <p className="relative col-span-2 flex h-[727px] flex-col items-center gap-4 overflow-hidden rounded-[36px] bg-white/[0.03] px-[136px] pt-[102px] max-md:col-span-1 max-md:h-[500px] max-md:gap-2 max-md:px-6 max-md:pt-10">
                        <div className="flex w-full flex-col gap-[21px] text-left max-md:gap-[10px]">
                            <span className="text-[40px] max-md:text-[28px]">
                                <Trans i18nKey={`It provides a default workspace and project for you`} />
                            </span>
                            <span className="max-md:text-[16px]">
                                <Trans
                                    i18nKey={`You can try out Eurekacodes with the default workspace and project provided`}
                                />
                            </span>
                        </div>
                        <img src={Images.landingBannder1} className="absolute bottom-0 z-10" />
                        <RadialGradient
                            radius={300}
                            colorStops={[
                                { position: '0%', color: 'rgba(19, 46, 180, 0.3)' },
                                { position: '30%', color: 'rgba(19, 46, 180, 0.2)' },
                                { position: '60%', color: 'rgba(19, 46, 180, 0.1)' },
                                { position: '90%', color: 'rgba(19, 46, 180, 0)' },
                            ]}
                            className="absolute -left-40 -top-32 opacity-50 blur-[49px]"
                        />
                        <RadialGradient
                            radius={300}
                            colorStops={[
                                { position: '0%', color: 'rgba(167, 65, 255, 0.5)' },
                                { position: '30%', color: 'rgba(143, 25, 246, 0.2)' },
                                { position: '60%', color: 'rgba(143, 25, 246, 0.1)' },
                                { position: '90%', color: 'rgba(143, 25, 246, 0)' },
                            ]}
                            className="absolute -bottom-48 -right-44 opacity-20 blur-[49px]"
                        />
                        <RadialGradient
                            radius={300}
                            colorStops={[
                                { position: '1%', color: 'rgba(255, 200, 19, 0.3)' },
                                { position: '51%', color: 'rgba(255, 200, 19, 0.2)' },
                                { position: '60%', color: 'rgba(255, 200, 19, 0.1)' },
                                { position: '90%', color: 'rgba(255, 200, 19, 0)' },
                            ]}
                            className="absolute -right-40 -top-48 opacity-10 blur-[49px]"
                        />
                    </p>
                    <p className="relative flex h-[889px] flex-col gap-8 overflow-hidden rounded-[36px] bg-white/[0.03] pl-[74px] pt-[120px] max-md:h-[680px] max-md:gap-4 max-md:px-6 max-md:pt-10">
                        <span className="text-[40px] leading-[150%] max-md:text-[28px] max-md:leading-normal">
                            <Trans
                                i18nKey="Try applying for the<br/>EurekaKit service<br/>from the catalog"
                                components={{
                                    br: <br />,
                                }}
                            />
                        </span>
                        <span className="text-[19px] font-light max-md:text-[16px]">
                            <Trans
                                i18nKey="You can find and apply for the service you<br/>need from a variety of available options"
                                components={{
                                    br: <br />,
                                }}
                            />
                        </span>
                        <img src={Images.landingBannder2} className="absolute bottom-0 right-0 max-h-[450px]" />
                        <RadialGradient
                            radius={240}
                            colorStops={[
                                { position: '0%', color: 'rgba(167, 65, 255, 0.5)' },
                                { position: '30%', color: 'rgba(143, 25, 246, 0.2)' },
                                { position: '60%', color: 'rgba(143, 25, 246, 0.1)' },
                                { position: '90%', color: 'rgba(143, 25, 246, 0)' },
                            ]}
                            className="absolute -left-48 -top-48 opacity-20 blur-[49px]"
                        />
                        <RadialGradient
                            radius={240}
                            colorStops={[
                                { position: '1%', color: 'rgba(255, 200, 19, 0.3)' },
                                { position: '51%', color: 'rgba(255, 200, 19, 0.2)' },
                                { position: '60%', color: 'rgba(255, 200, 19, 0.1)' },
                                { position: '90%', color: 'rgba(255, 200, 19, 0)' },
                            ]}
                            className="absolute -bottom-48 -right-40 opacity-10 blur-[49px]"
                        />
                    </p>
                    <p className="relative flex h-[889px] flex-col gap-8 overflow-hidden rounded-[36px] bg-white/[0.03] pl-[74px] pt-[120px] max-md:h-[680px] max-md:gap-4 max-md:px-6 max-md:pt-10">
                        <span className="text-[40px] leading-[150%] max-md:text-[28px] max-md:leading-normal">
                            <Trans
                                i18nKey="Try using the<br/>EurekaKit<br/>service with ease"
                                components={{
                                    br: <br />,
                                }}
                            />
                        </span>
                        <span className="text-[19px] font-light max-md:text-[16px]">
                            <Trans
                                i18nKey="After applying with a React Native app, you can build<br/>your product faster and customize it to your needs."
                                components={{
                                    br: <br />,
                                }}
                            />
                        </span>
                        <img src={Images.landingBannder3} className="absolute bottom-0 right-0 max-h-[450px]" />
                        <RadialGradient
                            radius={240}
                            colorStops={[
                                { position: '1%', color: 'rgba(255, 200, 19, 0.3)' },
                                { position: '51%', color: 'rgba(255, 200, 19, 0.2)' },
                                { position: '60%', color: 'rgba(255, 200, 19, 0.1)' },
                                { position: '90%', color: 'rgba(255, 200, 19, 0)' },
                            ]}
                            className="absolute -right-40 -top-48 opacity-10 blur-[49px]"
                        />
                        <RadialGradient
                            radius={240}
                            colorStops={[
                                { position: '0%', color: 'rgba(255, 255, 255, 0.5)' },
                                { position: '30%', color: 'rgba(255, 255, 255, 0.1)' },
                                { position: '50%', color: 'rgba(255, 255, 255, 0.05)' },
                                { position: '90%', color: 'rgba(255, 255, 255, 0)' },
                            ]}
                            className="absolute -left-96 bottom-0 opacity-20 blur-[49px]"
                        />
                    </p>
                </div>
                <div className="flex h-[426px] items-end justify-center max-md:h-[250px]">
                    <div
                        ref={ref}
                        className={cn(
                            'relative flex max-w-[954px] flex-1 items-center rounded-full p-[2px]',
                            'rotating-gradient',
                            'after:absolute after:h-full after:w-full after:rounded-full',
                            'after:z-0 after:bg-gradient-to-br after:from-[#FFE015]/40 after:from-20% after:via-[#FF8432]/40 after:via-40% after:to-[#B313E9]/40 after:to-80% after:opacity-20 after:blur-xl'
                        )}
                    >
                        <div className="z-10 flex w-full items-center gap-5 rounded-full bg-[#161617] py-5 pl-10 pr-5 max-md:flex-col max-md:gap-3 max-md:px-6 max-md:py-4">
                            <span className="text-[30px] font-light max-md:text-center max-md:text-[20px]">
                                <Trans i18nKey={'Apply for EurekaKit and try using it'} />
                            </span>
                            <a
                                href="https://eureka.codes/"
                                className="ml-auto inline-flex gap-2 rounded-full bg-white/[0.07] py-4 pl-8 pr-5 text-[24px] hover:bg-white/10 max-md:ml-0 max-md:px-6 max-md:py-3 max-md:text-[18px]"
                            >
                                <Trans i18nKey={'Apply for the Kit'} />
                                <ChevronRight className="!h-auto !w-auto max-md:!h-6 max-md:!w-6" size={28} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex h-[638px] flex-col items-center justify-center gap-[29px] pb-[240px] pt-[280px] max-md:h-[350px] max-md:gap-[15px] max-md:pb-[120px] max-md:pt-[140px]">
                    <div className="h-8">
                        <img src={Images.eurekaCodesLogo} className="h-[37px]" />
                    </div>
                    <div className="flex flex-col items-center gap-[10px] text-[15px] font-medium text-[#84888F] max-md:gap-[5px] max-md:text-[12px]">
                        <span>© 2025 LemonCloud, Inc. All rights reserved.</span>
                        <button className="hover:underline">Privacy & Terms</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
