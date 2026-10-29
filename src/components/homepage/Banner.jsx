'use client'
import { useState } from 'react';

export default function Banner() {
    const [adults, setAdults] = useState(2);


    return (
        <>
            <div className=" bg-surface min-h-[calc(100vh-20rem)] flex flex-col w-full">


                <section className="relative w-full -mt-20 overflow-visible z-20">
                    {/* <!-- Hero Background Image & Gradient Scrim --> */}
                    <div
                        className="relative flex min-h-[640px] w-full flex-col justify-between bg-cover bg-center lg:min-h-[720px]"
                        data-alt="Ultra-luxury cliffside Mediterranean resort infinity pool at sunset overlooking panoramic calm ocean waters, elegant warm lantern lighting, natural stone terraces and modern lounge beds under warm golden hour skies with peach and indigo hues"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmjJrcBzDJMEuFiItcGoPAvARMJ9sG4NSSWho1xpdujLTBsShOaNCuz5I6990zgSTNMCTyj8Q-pmTh-pdmJq8b91MPFKHZID5qNOeKr_21ODxeCtvJMGv2aBcdAPODtR5oHej6S3f6UmLssdZ9_HhTx2X1HM0KeH3k979VXyMnq_9024v8Et1XK1NRJcVCWOv0WDWTInQVsT5t2u4eMsW4AbACQgQIorGq6T7sYZXG')",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-text-primary/75 via-text-primary/50 to-surface"></div>
                        {/* <!-- Ambient Visual Texture --> */}
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <radialGradient
                                        cx="50%"
                                        cy="30%"
                                        id="hero-glow"
                                        r="50%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#ffffff"
                                            stopOpacity="0.3"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#ffffff"
                                            stopOpacity="0"
                                        />
                                    </radialGradient>
                                </defs>
                                <rect fill="url(#hero-glow)" height="100%" width="100%"></rect>
                            </svg>
                        </div>
                        {/* <!-- Hero Header Content --> */}
                        <div className="relative max-w-[1280px] w-full mx-auto px-margin-mobile md:px-margin pt-36 md:pt-44 pb-12 flex flex-col items-center text-center">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-surface mb-6 shadow-sm">
                                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">verified</span>
                                <span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-bright">
                                    Guaranteed Best Hospitality Rates
                                </span>
                            </div>
                            <h1 className="font-display text-headline-lg-mobile md:text-display text-surface font-bold tracking-tight max-w-4xl text-balance">
                                Find Your Perfect Stay
                            </h1>
                            <p className="mt-4 font-body-lg text-body-md md:text-body-lg text-surface-variant max-w-2xl text-balance">
                                Discover comfortable hotels, compare your options, and book your next stay with confidence across West Africa and top global gateways.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-surface-variant font-label-sm text-label-sm">
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-success-deal text-[18px]">check_circle</span>
                                    <span>Zero Booking Fees</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-success-deal text-[18px]">check_circle</span>
                                    <span>Instant Mobile Voucher</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-success-deal text-[18px]">check_circle</span>
                                    <span>Transparent Rates</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-12 w-full"></div>
                    </div>

                    <div className=" px-margin-mobile md:px-margin -mt-24 md:-mt-28 relative z-30 ">
                        <div className="bg-surface-card rounded-2xl  shadow-xl p-4 md:p-6 ">

                            <div className="flex items-center gap-4 mb-4 overflow-x-auto pb-1 ">
                                <button className="inline-flex  text-lg items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-on-primary font-label-md text-label-md" type="button">
                                    <span className="material-symbols-outlined text-[18px]">hotel</span>
                                    <span >Hotels &amp; Suites</span>
                                </button>
                                <button className="inline-flex items-center text-lg gap-2 px-4 py-2 rounded-full bg-surface-subtle text-text-secondary hover:text-text-primary hover:bg-surface-variant/40 transition-colors font-label-md text-label-md" type="button">
                                    <span className="material-symbols-outlined text-[18px]">holiday_village</span>
                                    <span>Luxury Resorts</span>
                                </button>
                                <button className="inline-flex items-center text-lg gap-2 px-4 py-2 rounded-full bg-surface-subtle text-text-secondary hover:text-text-primary hover:bg-surface-variant/40 transition-colors font-label-md text-label-md" type="button">
                                    <span className="material-symbols-outlined text-[18px]">domain_verification</span>
                                    <span>Serviced Apartments</span>
                                </button>
                            </div>

                            <form action="#" className="grid grid-cols-1 md:grid-cols-12 gap-3" id="hotel-search-form" method="GET">

                                <div className="md:col-span-4 relative group" id="destination-wrapper">
                                    <label className="block font-label-sm text-label-lg text-text-secondary mb-1">Where are you going?</label>
                                    <div className="relative flex items-center bg-surface-card rounded-lg focus-within:ring-2 focus-within:ring-primary-container shadow-sm">
                                        <span className="material-symbols-outlined text-text-muted ml-3 text-[22px] group-focus-within:text-primary">location_on</span>
                                        <input
                                            autoComplete="off"
                                            className="w-full bg-transparent py-3 pl-2.5 pr-4 text-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none"
                                            id="destination-input"
                                            placeholder="e.g. Lagos, Victoria Island or Dubai"
                                            type="text"
                                            defaultValue="Victoria Island, Lagos"
                                        />
                                        <button className="mr-2 text-text-muted hover:text-text-primary hidden" id="clear-dest-btn" type="button">
                                            <span className="material-symbols-outlined text-[18px]">cancel</span>
                                        </button>
                                    </div>

                                    <div className="hidden absolute left-0 right-0 top-full mt-2 bg-surface-card rounded-xl shadow-xl z-50 p-2" id="destination-popup">
                                        <div className="p-2 text-text-secondary font-label-sm text-label-sm flex items-center justify-between">
                                            <span>POPULAR DESTINATIONS</span>
                                            <span className="text-primary font-semibold">Nigeria &amp; Global</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5 mt-1">
                                            <button className="dest-option flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-container-low text-left transition-colors" data-value="Victoria Island, Lagos" type="button">
                                                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-[18px]">apartment</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-label-md   text-text-primary">Victoria Island, Lagos</span>
                                                    <span className="font-body-sm text-body-sm text-text-secondary">Commercial hub, beach bars &amp; 5-star towers</span>
                                                </div>
                                            </button>
                                            <button className="dest-option flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-container-low text-left transition-colors" data-value="Ikoyi, Lagos" type="button">
                                                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-[18px]">deck</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md text-text-primary">Ikoyi, Lagos</span>
                                                    <span className="font-body-sm text-body-sm text-text-secondary">Diplomatic enclave, luxury boutiques &amp; waterfront</span>
                                                </div>
                                            </button>
                                            <button className="dest-option flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-container-low text-left transition-colors" data-value="Central Business District, Abuja" type="button">
                                                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-[18px]">location_city</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md text-text-primary">Central Business District, Abuja</span>
                                                    <span className="font-body-sm text-body-sm text-text-secondary">Federal capital center, conferences &amp; lush greenery</span>
                                                </div>
                                            </button>
                                            <button className="dest-option flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-container-low text-left transition-colors" data-value="Downtown Dubai, UAE" type="button">
                                                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-[18px]">flight</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-label-md text-label-md text-text-primary">Downtown Dubai, UAE</span>
                                                    <span className="font-body-sm text-body-sm text-text-secondary">Burj Khalifa, skyline infinity pools &amp; luxury shopping</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-4 grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block font-label-sm text-lg text-text-secondary mb-1">Check-in</label>
                                        <div className="relative flex items-center bg-surface-card rounded-lg focus-within:ring-2 focus-within:ring-primary-container shadow-sm cursor-pointer px-3 py-3">
                                            <span className="material-symbols-outlined text-text-muted text-[20px] mr-2">calendar_today</span>
                                            <div className="flex flex-col">
                                                <span className="font-label-md text-label-md text-text-primary">Oct 12, 2026</span>
                                                <span className="font-label-sm text-base text-text-secondary">Monday</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-label-sm text-lg text-text-secondary mb-1">Check-out</label>
                                        <div className="relative flex items-center bg-surface-card rounded-lg focus-within:ring-2 focus-within:ring-primary-container shadow-sm cursor-pointer px-3 py-3">
                                            <span className="material-symbols-outlined text-text-muted text-[20px] mr-2">calendar_month</span>
                                            <div className="flex flex-col">
                                                <span className="font-label-md text-label-md text-text-primary">Oct 15, 2026</span>
                                                <span className="font-label-sm text-base text-text-secondary">Thursday (3 nights)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 relative" id="guests-wrapper">
                                    <label className="block font-label-sm text-lg text-text-secondary mb-1">Guests &amp; Rooms</label>
                                    <button className="w-full flex items-center justify-between bg-surface-card rounded-lg focus:ring-2 focus:ring-primary-container shadow-sm px-3 py-3 text-left" id="guests-toggle-btn" type="button">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <span className="material-symbols-outlined text-text-muted text-[20px]">group</span>
                                            <span className="font-label-md text-label-base text-text-primary truncate" id="guests-summary-label">2 Guests · 1 Room</span>
                                        </div>
                                        <span className="material-symbols-outlined text-text-muted text-[18px]">expand_more</span>
                                    </button>

                                    <div className="hidden absolute right-0 top-full mt-2 w-72 bg-surface-card rounded-xl shadow-xl z-50 p-4" id="guests-popup">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between pb-3 bg-surface-subtle/50 px-2 py-1.5 rounded-lg">
                                                <div>
                                                    <span className="font-label-md text-label-md text-text-primary block">Adults</span>
                                                    <span className="font-label-sm text-label-sm text-text-secondary">Ages 18 or above</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-high font-bold text-text-primary transition-colors hover:bg-surface-variant"
                                                        onClick={() => adjustCount("adults", -1)}
                                                        type="button"
                                                    >
                                                        -
                                                    </button>

                                                    <span className="w-5 text-center text-sm font-semibold">
                                                        {adults}
                                                    </span>

                                                    <button
                                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-high font-bold text-text-primary transition-colors hover:bg-surface-variant"
                                                        onClick={() => adjustCount("adults", 1)}
                                                        type="button"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pb-3 bg-surface-subtle/50 px-2 py-1.5 rounded-lg">
                                                <div>
                                                    <span className="font-label-md text-label-md text-text-primary block">Children</span>
                                                    <span className="font-label-sm text-label-sm text-text-secondary">Ages 0 to 17</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-text-primary hover:bg-surface-variant transition-colors" onClick={() => adjustCount("adults", -1)} type="button">-</button>
                                                    <span className="font-label-md text-label-md w-5 text-center" id="count-children">0</span>
                                                    <button className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-text-primary hover:bg-surface-variant transition-colors" onClick={() => adjustCount("adults", -1)} type="button">+</button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pb-3 bg-surface-subtle/50 px-2 py-1.5 rounded-lg">
                                                <div>
                                                    <span className="font-label-md text-label-md text-text-primary block">Rooms</span>
                                                    <span className="font-label-sm text-label-sm text-text-secondary">Total booked units</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-text-primary hover:bg-surface-variant transition-colors" onClick={() => adjustCount("adults", -1)} type="button">-</button>
                                                    <span className="font-label-md text-label-md w-5 text-center" id="count-rooms">1</span>
                                                    <button className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-text-primary hover:bg-surface-variant transition-colors" onClick={() => adjustCount("adults", -1)} type="button">+</button>
                                                </div>
                                            </div>
                                            <button className="w-full py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors" id="guests-apply-btn" type="button">
                                                Done
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 flex flex-col justify-end">
                                    <button className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary rounded-lg font-label-md text-lg shadow-md flex items-center justify-center gap-2 transition-all" type="submit">
                                        <span className="material-symbols-outlined text-lg">search</span>
                                        <span>Search Hotels</span>
                                    </button>
                                </div>
                            </form>

                            <div className="mt-4 pt-3 flex items-center gap-2 flex-wrap">
                                <span className="font-label-sm text-label-sm text-text-secondary mr-1">Quick Filters:</span>
                                <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-deal-subtle text-success-deal font-label-sm text-label-sm hover:opacity-90" type="button">
                                    <span className="material-symbols-outlined text-[15px]">flash_on</span>
                                    <span>Free Cancellation</span>
                                </button>
                                <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle text-text-secondary hover:text-text-primary hover:bg-surface-container font-label-sm text-label-sm transition-colors" type="button">
                                    <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim">stars</span>
                                    <span>Luxury Sanctuaries</span>
                                </button>
                                <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle text-text-secondary hover:text-text-primary hover:bg-surface-container font-label-sm text-label-sm transition-colors" type="button">
                                    <span className="material-symbols-outlined text-[15px] text-primary">business_center</span>
                                    <span>Business Travel Ready</span>
                                </button>
                                <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle text-text-secondary hover:text-text-primary hover:bg-surface-container font-label-sm text-label-sm transition-colors" type="button">
                                    <span className="material-symbols-outlined text-[15px] text-surface-tint">pool</span>
                                    <span>Private Pool &amp; Oceanfront</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </div>;
        </>
    )
}
