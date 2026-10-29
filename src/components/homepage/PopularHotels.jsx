import React from 'react'

export default function PopularHotels() {
    return (
        <>

            <section className="w-full bg-surface-container-lowest py-20">
                <div className="max-w-full  mx-auto px-margin-mobile md:px-margin">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md mb-2">
                                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                                <span>VERIFIED GUEST FAVORITES</span>
                            </div>
                            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold tracking-tight">
                                Popular Hotels
                            </h2>
                            <p className="font-body-md text-body-md text-text-secondary mt-1">
                                Handpicked stays travelers are loving right now with high verified ratings and stellar service.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            <button className="px-4 py-2 rounded-full bg-text-primary text-surface font-label-sm text-label-sm whitespace-nowrap shadow-sm" type="button">
                                All Popular
                            </button>
                            <button className="px-4 py-2 rounded-full bg-surface-subtle text-text-secondary hover:text-text-primary font-label-sm text-label-sm whitespace-nowrap transition-colors" type="button">
                                Lagos Stays
                            </button>
                            <button className="px-4 py-2 rounded-full bg-surface-subtle text-text-secondary hover:text-text-primary font-label-sm text-label-sm whitespace-nowrap transition-colors" type="button">
                                Abuja Picks
                            </button>
                            <button className="px-4 py-2 rounded-full bg-surface-subtle text-text-secondary hover:text-text-primary font-label-sm text-label-sm whitespace-nowrap transition-colors" type="button">
                                Resorts &amp; Waterfront
                            </button>
                            <button className="px-4 py-2 rounded-full bg-surface-subtle text-text-secondary hover:text-text-primary font-label-sm text-label-sm whitespace-nowrap transition-colors" type="button">
                                Boutique Stays
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div className="relative w-full h-56 overflow-hidden">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Grand multi-story modern luxury hotel tower in Victoria Island Lagos Nigeria at dusk with luminous warm interior lighting, glass facade and reflections over the city waterways" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTdcJGQFqwh9yhJqsjHV87HMkMAAfzXJRNjO7J2LAO69J9TU1xyLOd8wdtoLgLHqEj4KmEkSPrdkv7pXfvgX5bzpdgdDwaOA61R2iKTte3XzkF6OB5zhT9BP-5nJTHb5kTmylwPfqEoRDB7pRYkvT_MQIEdbjDCPtIBR365hjTnogvbEv3G8466McewDXBlFR5bhW4rtObHpriRuhhjUWWLc3-YAC7lafylgALsIuS" />
                                <button aria-label="Save to favorites" className="fav-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-card/80 backdrop-blur-md flex items-center justify-center text-text-primary hover:text-error transition-colors shadow-sm" type="button">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-text-primary/80 backdrop-blur-md text-surface font-label-sm text-label-sm flex items-center gap-1">
                                    <span
                                        className="material-symbols-outlined text-tertiary-fixed text-[14px]"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        star
                                    </span>
                                    <span>5-Star Hotel</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="font-body-sm text-body-sm text-text-secondary flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[15px] text-text-muted">location_on</span>
                                            Victoria Island, Lagos
                                        </span>
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-text-primary text-surface font-label-sm text-label-sm">
                                            <span className="font-bold">4.8</span>
                                            <span className="text-text-muted text-[10px]">(1,245)</span>
                                        </div>
                                    </div>
                                    <h3 className="font-headline-sm text-title text-text-primary font-bold group-hover:text-primary transition-colors">
                                        Lagos Continental Hotel
                                    </h3>

                                    <div className="flex flex-wrap gap-1.5 my-3">
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Free Wi-Fi</span>
                                        ``                      <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Ocean View</span>
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Spa &amp; Wellness</span>
                                    </div>
                                </div>
                                <div className="pt-4 mt-2 bg-surface-subtle/50 -mx-5 -mb-5 px-5 py-4 flex items-center justify-between">
                                    <div>
                                        <span className="font-label-sm text-label-sm text-text-secondary block">Starting from</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-price-display text-price-display text-text-primary font-bold">₦150,000</span>
                                            <span className="font-body-sm text-body-sm text-text-secondary">/ night</span>
                                        </div>
                                    </div>
                                    <a className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors shadow-sm" href="#">
                                        View Hotel
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div className="relative w-full h-56 overflow-hidden">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Vast tropical resort complex with expansive multi-section azure swimming pool, palm trees, sun loungers and grand conference hotel building under bright sunny daylight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3QoYwr-uqIShatNWVNiPDOxOzT9EzZOV-2oNoaLhBkNsHA79S9dRBb5YNlY2ZFWxVAEbrbcThPdBeRNlkU5gBdIDPJ7dOVXpSnQ2InSfB6JFRhAa1lRtmDO4bSXPrnvNlve48Fq5DSwq4zfjBDhIf9cxsliEU45_vl8z67M3hH8VxxgOs5exRKkI7xU11Jx2k7IkeNX_1Up5FEDerDimgkQejE19WQYWyXrpGpwGM" />
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-success-deal text-on-primary font-label-sm text-label-sm font-bold shadow-sm">
                                    15% Off
                                </div>
                                <button aria-label="Save to favorites" className="fav-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-card/80 backdrop-blur-md flex items-center justify-center text-text-primary hover:text-error transition-colors shadow-sm" type="button">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-text-primary/80 backdrop-blur-md text-surface font-label-sm text-label-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-tertiary-fixed text-[14px]" style={{
                                        fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                                    }}>star</span>
                                    <span>5-Star Resort</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="font-body-sm text-body-sm text-text-secondary flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[15px] text-text-muted">location_on</span>
                                            Victoria Island, Lagos
                                        </span>
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-text-primary text-surface font-label-sm text-label-sm">
                                            <span className="font-bold">4.7</span>
                                            <span className="text-text-muted text-[10px]">(2,180)</span>
                                        </div>
                                    </div>
                                    <h3 className="font-headline-sm text-title text-text-primary font-bold group-hover:text-primary transition-colors">
                                        Eko Hotel &amp; Suites
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5 my-3">
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Olympic Pool</span>
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">8 Restaurants</span>
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Convention Ctr</span>
                                    </div>
                                </div>
                                <div className="pt-4 mt-2 bg-surface-subtle/50 -mx-5 -mb-5 px-5 py-4 flex items-center justify-between">
                                    <div>
                                        <span className="font-label-sm text-label-sm text-text-secondary line-through">₦218,000</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-price-display text-price-display text-text-primary font-bold">₦185,000</span>
                                            <span className="font-body-sm text-body-sm text-text-secondary">/ night</span>
                                        </div>
                                    </div>
                                    <a className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors shadow-sm" href="#">
                                        View Hotel
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div className="relative w-full h-56 overflow-hidden">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Quiet colonial-inspired boutique luxury hotel central courtyard in Ikoyi with rectangular turquoise swimming pool, lush manicured tropical hedges and private cabanas" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI57lUtq955ZsbSBmYoEoApV7jFU7kwWSupVnv3aj4aFudZGCasaOdwb67JTKbBzKbPSkmqgEBepyHv2FZDQscAUj33cOusFeN9Uq-i_p0Lj-zyQep4vfgu9BauJEsM2aUw8eGFGBBv7uPpqZlF-aQpfpHf7yKzpTSZ4RMaPcmidvhKEp9maDdtZxGywBW98Zrb280IvxdsaZJgepMrcaAh0cGv-u2lDb2e86NgAPf" />
                                <button aria-label="Save to favorites" className="fav-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-card/80 backdrop-blur-md flex items-center justify-center text-text-primary hover:text-error transition-colors shadow-sm" type="button">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-text-primary/80 backdrop-blur-md text-surface font-label-sm text-label-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-tertiary-fixed text-[14px]" style={{
                                        fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                                    }}>award_star</span>
                                    <span>Luxury Boutique</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="font-body-sm text-body-sm text-text-secondary flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[15px] text-text-muted">location_on</span>
                                            Ikoyi, Lagos
                                        </span>
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-text-primary text-surface font-label-sm text-label-sm">
                                            <span className="font-bold">4.9</span>
                                            <span className="text-text-muted text-[10px]">(640)</span>
                                        </div>
                                    </div>
                                    <h3 className="font-headline-sm text-title text-text-primary font-bold group-hover:text-primary transition-colors">
                                        The George Hotel Ikoyi
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5 my-3">
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Private Courtyard</span>
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Butler Service</span>
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Gourmet Dining</span>
                                    </div>
                                </div>
                                <div className="pt-4 mt-2 bg-surface-subtle/50 -mx-5 -mb-5 px-5 py-4 flex items-center justify-between">
                                    <div>
                                        <span className="font-label-sm text-label-sm text-text-secondary block">Starting from</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-price-display text-price-display text-text-primary font-bold">₦210,000</span>
                                            <span className="font-body-sm text-body-sm text-text-secondary">/ night</span>
                                        </div>
                                    </div>
                                    <a className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors shadow-sm" href="#">
                                        View Hotel
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div className="relative w-full h-56 overflow-hidden">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Sleek Scandinavian modern minimalist boutique hotel exterior with warm wood accents, ambient architectural spotlighting, tropical foliage garden path at Lekki Lagos" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKoUhaTgkpWVw7BK-g0Zc5HrMLPOnFpRcTdQd4WyOnho_aoAU2pqCkf2ELBeswueVAq0lri65L-6hj22Y_u-_DZOl1pBKwT3F6oK863S_KKfZSUZLkknJeDKdviccSzZqilY9C9DhBn5xA_HVIKY5lLbFqn0Kz9usFAaBZxu7hKVPeMoIeEB-Rgp-2AzTzQj2Iaqxld9pM-Itl0YBKr2DY3luoSlTZ4BCg0ERvm5gb" />
                                <button aria-label="Save to favorites" className="fav-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-card/80 backdrop-blur-md flex items-center justify-center text-text-primary hover:text-error transition-colors shadow-sm" type="button">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-text-primary/80 backdrop-blur-md text-surface font-label-sm text-label-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-tertiary-fixed text-[14px]" style={{
                                        fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                                    }}>design_services</span>
                                    <span>Scandi-Boutique</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="font-body-sm text-body-sm text-text-secondary flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[15px] text-text-muted">location_on</span>
                                            Lekki Phase 1, Lagos
                                        </span>
                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-text-primary text-surface font-label-sm text-label-sm">
                                            <span className="font-bold">4.7</span>
                                            <span className="text-text-muted text-[10px]">(490)</span>
                                        </div>
                                    </div>
                                    <h3 className="font-headline-sm text-title text-text-primary font-bold group-hover:text-primary transition-colors">
                                        Nordic Hotel Lagos
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5 my-3">
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Minimalist Design</span>
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Designer Suites</span>
                                        <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary font-label-sm text-label-sm">Garden Terrace</span>
                                    </div>
                                </div>
                                <div className="pt-4 mt-2 bg-surface-subtle/50 -mx-5 -mb-5 px-5 py-4 flex items-center justify-between">
                                    <div>
                                        <span className="font-label-sm text-label-sm text-text-secondary block">Starting from</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-price-display text-price-display text-text-primary font-bold">₦120,000</span>
                                            <span className="font-body-sm text-body-sm text-text-secondary">/ night</span>
                                        </div>
                                    </div>
                                    <a className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors shadow-sm" href="#">
                                        View Hotel
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
